import { useContext } from "react";
import SpellsContext from "../context/spellsContext";
import classNames from "classnames";

function SpellRow({ spell, highlight, active }) {
  const { selectSpell } = useContext(SpellsContext);

  const classes = classNames(
    "flex w-full h-6 px-2 hover:bg-gray-100 cursor-pointer rounded-lg",
    {
      "bg-blue-200 hover:bg-blue-300": highlight && !active,
      "bg-blue-500 hover:bg-blue-400 text-white": active,
    }
  );

  return (
    <div className={classes} onClick={() => selectSpell(spell)}>
      {spell.name}
    </div>
  );
}

export default SpellRow;
