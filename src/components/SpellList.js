import { useContext, useEffect } from "react";
import SpellsContext from "../context/spellsContext";
import SpellRow from "./SpellRow";

function SpellList({ page }) {
  const { spellList, selectedSpell, savedSpells } = useContext(SpellsContext);

  const spellbook = page === "spellbook";
  const renderedSpellList = spellbook ? savedSpells : spellList;

  /*
  var renderedSpells = {};
  if (spellbook) {
    // For 0-9, render a group which renders the spells of that level
    renderedSpells = Array.from(Array(9).keys()).map((level) => {
      const groupSpells = savedSpells
        .filter((spell) => spell.level === level)
        .map((spell) => {
          return <SpellRow key={spell.index} spell={spell}></SpellRow>;
        });
      return (
        groupSpells.length > 0 && (
          <>
            <SpellRow divider dividerContent={level}></SpellRow>
            {groupSpells}
          </>
        )
      );
    });
  } else {
    // For 0-9, render a group which renders the spells of that level
    renderedSpells = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => {
      const groupSpells = spellList
        .filter((spell) => spell.name[0] === letter)
        .map((spell) => {
          return <SpellRow key={spell.index} spell={spell}></SpellRow>;
        });
      return (
        groupSpells.length > 0 && (
          <>
            <SpellRow divider dividerContent={letter}></SpellRow>
            {groupSpells}
          </>
        )
      );
    });
  }
  */

  const renderedSpells = renderedSpellList.map((spell) => {
    const highlight =
      !spellbook && savedSpells.map((s) => s.index).includes(spell.index);

    return (
      <SpellRow
        key={spell.index}
        spell={spell}
        highlight={highlight}
        active={selectedSpell && spell.index === selectedSpell.index}
      ></SpellRow>
    );
  });

  return (
    <div className="flex flex-wrap divide-y overflow-auto">
      {renderedSpells}
    </div>
  );
}

export default SpellList;
