import { useContext } from "react";
import SpellsContext from "../../context/spellsContext";
import Button from "../Button";
import InfoLine from "./InfoLine";
import ThemeContext from "../../context/themeContext";
import { GiSpellBook } from "react-icons/gi";
import { CircleLoader, ClipLoader } from "react-spinners";

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

const divider = (theme) => {
  return <div className={"border-b my-2" + theme.divider}></div>;
};

function SpellCard() {
  const { selectedSpell, savedSpells, saveSpellToggle } =
    useContext(SpellsContext);
  const { theme, themeMode } = useContext(ThemeContext);
  const spell = selectedSpell;

  const loadingIcon = () => {
    console.log(theme.lightHighlight);
    return (
      <div className="h-96 w-full flex flex-col justify-center items-center">
        <ClipLoader
          color={
            themeMode === "light" ? theme.lightHighlight : theme.darkHighlight
          }
        ></ClipLoader>
        <div className="text-center text-gray-500 m-3">
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)] +
            "..."}
        </div>
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
            className="w-14 h-10 text-2xl p-0 pt-0.5"
            onClick={() => saveSpellToggle(spell)}
          >
            <GiSpellBook size={32} />
          </Button>
          <div className="ml-2">
            <div className="font-bold text-xl">{spell.name}</div>
            <div className="italic text-sm">
              {spellLevelText(spell.level, spell.school.name)}
            </div>
          </div>
        </div>
        {divider(theme)}
        <InfoLine title="Range" content={spell.range} />
        <InfoLine title="Components" content={componentsContent} />
        <InfoLine title="Duration" content={durationContent} />
        <InfoLine title="Casting Time" content={spell.casting_time} />
        {divider(theme)}
        <InfoLine content={descContent} />
        {spell.higher_level.length > 0 && (
          <InfoLine title="At Higher Levels" content={spell.higher_level} />
        )}
      </div>
    );
  };

  return (
    <div className="overflow-auto">
      {/* {loadingIcon()} */}
      {spell && spell.desc ? spellContent() : loadingIcon()}
    </div>
  );
}

export default SpellCard;
