import { useContext, useState } from "react";
import SpellsContext from "../../context/spellsContext";
import Button from "../Button";
import InfoLine from "./InfoLine";

const loadingMessages = [
  "Investigating the arcane",
  "Scouring through ancient tomes",
  "Demystifying the mysterious",
  "Pondering orbs",
  "Making sense of magic",
  "Learning forbidden knowledge",
  "Scrolling through scrolls",
  "Translating from Elven",
  "Fetching reading glasses",
  "Conjuring cheap tricks",
  "Conceiving the unthinkable",
  "Excavating eldritch horrors",
  "Summoning secrets",
];

const spellLevelText = (level, school) => {
  var numSuffix =
    level > 0 && level <= 3 ? ["", "st", "nd", "rd"][level] : "th";
  return level + numSuffix + " level " + school;
};

const divider = () => {
  return <div className="border-b my-2"></div>;
};

function SpellCard() {
  const { selectedSpell, savedSpells, saveSpellToggle } =
    useContext(SpellsContext);
  const spell = selectedSpell;

  const loadingIcon = () => {
    return (
      <div className="text-center text-gray-500">
        {loadingMessages[Math.floor(Math.random() * loadingMessages.length)] +
          "..."}
      </div>
    );
  };

  const spellContent = () => {
    const componentsContent =
      (spell.components ? spell.components.join(", ") : "") +
      (spell.material ? " (" + spell.material + ")" : "");
    const durationContent =
      spell.duration + (spell.concentration ? " (concentration)" : "");
    const descContent = spell.desc.map((line, index) => {
      return (
        <div key={index} className="pb-3">
          {line}
        </div>
      );
    });

    return (
      <div className="overflow">
        <div className="flex">
          <Button
            active={savedSpells
              .map((savedSpell) => savedSpell.index)
              .includes(spell.index)}
            className="w-12 text-2xl pt-0.5"
            onClick={() => saveSpellToggle(spell)}
          >
            📖
          </Button>
          <div className="ml-2">
            <div className="font-bold text-xl">{spell.name}</div>
            <div className="italic text-sm">
              {spellLevelText(spell.level, spell.school.name)}
            </div>
          </div>
        </div>
        {divider()}
        <InfoLine title="Range" content={spell.range} />
        <InfoLine title="Components" content={componentsContent} />
        <InfoLine title="Duration" content={durationContent} />
        <InfoLine title="Casting Time" content={spell.casting_time} />
        {divider()}
        <InfoLine content={descContent} />
        {spell.higher_level.length > 0 && (
          <InfoLine title="At Higher Levels" content={spell.higher_level} />
        )}
      </div>
    );
  };

  return (
    <div className="overflow-auto">
      {spell && spell.desc ? spellContent() : loadingIcon()}
    </div>
  );
}

export default SpellCard;
