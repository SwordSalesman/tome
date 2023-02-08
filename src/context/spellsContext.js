import { createContext, useState, useCallback } from "react";
import axios from "axios";

const urlBase = "/api/spells";
const SpellsContext = createContext();

// Provider is essentially a wrapper for the context and its main pupose is to store state
function Provider({ children }) {
  // Set up state
  const [spellList, setSpellList] = useState([]);
  const [savedSpells, setSavedSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);

  // Get all spells from the server and update the state accordingly
  const fetchSpells = useCallback(async () => {
    //axios.defaults.headers.get["withCredentials"] = "false";
    const response = await axios.get(urlBase);
    setSpellList(response.data.results);
    selectSpell(response.data.results[0]);
  }, []);

  const selectSpell = async (spell) => {
    // Check if user clicked the currently selected spell again
    if (selectedSpell && spell.index === selectedSpell.index) {
      return;
    }
    // Spell is the 'full' version, likely obtained from the spellbook, no need to fetch anything!
    if (savedSpells.map((s) => s.index).includes(spell.index)) {
      setSelectedSpell(savedSpells.filter((s) => s.index === spell.index)[0]);
      return;
    }
    // Fetching new spell details procedure
    setSelectedSpell(null);
    const response = await axios.get(`${urlBase}/${spell.index}`);
    setSelectedSpell(response.data);
  };

  // Toggles between saved and not saved
  const saveSpellToggle = (spell) => {
    // Remove the spell if it's already saved
    if (savedSpells.map((s) => s.index).includes(spell.index)) {
      setSavedSpells(
        savedSpells.filter((savedSpell) => {
          return savedSpell.index !== spell.index;
        })
      );
    }
    // Add the spell if it isn't saved
    else {
      setSavedSpells([...savedSpells, spell]);
    }
  };

  const spellsContext = {
    spellList,
    savedSpells,
    selectedSpell,
    fetchSpells,
    selectSpell,
    saveSpellToggle,
  };

  return (
    <SpellsContext.Provider value={spellsContext}>
      {children}
    </SpellsContext.Provider>
  );
}

export { Provider };
export default SpellsContext;
