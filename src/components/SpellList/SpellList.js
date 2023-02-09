import { useContext } from "react";
import SpellsContext from "../../context/spellsContext";
import Row from "./Row";

function SpellList({ page }) {
  const { spellList, selectedSpell, savedSpells, selectSpell } =
    useContext(SpellsContext);

  const spellbook = page === "spellbook";
  const renderedSpellList = spellbook ? savedSpells : spellList;
  const groups = spellbook
    ? Array.from(Array(9).keys())
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Render a group which renders the spells of that level
  const renderedSpells = groups.map((groupId) => {
    // Filter by group, building a row for each item
    const groupSpells = renderedSpellList
      .filter((spell) => (spellbook ? spell.level : spell.name[0]) === groupId)
      .sort((a, b) => (a.index > b.index ? 1 : -1))
      .map((spell) => {
        const highlight =
          !spellbook && savedSpells.map((s) => s.index).includes(spell.index);
        const active = selectedSpell && spell.index === selectedSpell.index;

        return (
          <Row
            key={spell.index}
            clickable
            highlight={highlight}
            active={active}
            onClick={() => selectSpell(spell)}
          >
            {spell.name}
          </Row>
        );
      });
    // Build grouped section, including a divider to indicate the group
    return (
      groupSpells.length > 0 && (
        <>
          <Row key={groupId} divider>
            {spellbook && "Level "}
            {groupId}
          </Row>
          {groupSpells}
        </>
      )
    );
  });

  return (
    <div className="flex flex-wrap divide-y overflow-auto">
      {renderedSpells}
    </div>
  );
}

export default SpellList;
