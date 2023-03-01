import { createContext, useState, useCallback } from "react";
import axios from "axios";
//import customAxios from "../api.js";

const proxyPrefix = "https://api.codetabs.com/v1/proxy?quest=";
const urlBase = proxyPrefix + "https://dnd5eapi.co/api/spells";
const SpellsContext = createContext();

// Provider is essentially a wrapper for the context and its main pupose is to store state
function SpellsContextProvider({ children }) {
  // Set up state
  const [spellList, setSpellList] = useState([]);
  const [savedSpells, setSavedSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState([]);

  // Get all spells from the server and update the state accordingly
  const fetchSpells = useCallback(async () => {
    //axios.defaults.headers.get["withCredentials"] = "false";
    const response = await axios.get(urlBase);
    setSpellList(response.data.results);
    // Set up initially selected spell
    const loadedSelect = window.localStorage.getItem("selectedSpell");
    selectSpell(
      loadedSelect ? { index: loadedSelect } : response.data.results[0]
    );
    // Set up initially saved spells
    const loadedSaved = JSON.parse(window.localStorage.getItem("savedSpells"));
    setSavedSpells(loadedSaved ? loadedSaved : []);
  }, []);

  // Change the active spell in the spell card
  const selectSpell = async (spell) => {
    // Check if user clicked the currently selected spell again
    if (selectedSpell && spell.index === selectedSpell.index) {
      return;
    }
    window.localStorage.setItem("selectedSpell", spell.index);
    // Spell is the 'full' version, likely obtained from the spellbook, no need to fetch anything!
    const matchingSpell = savedSpells.find((s) => s.index === spell.index);
    if (matchingSpell && matchingSpell.desc) {
      setSelectedSpell(matchingSpell);
      return;
    }
    // Fetching new spell details procedure
    //setSelectedSpell(null);
    setSelectedSpell({ index: spell.index });
    const response = await axios.get(`${urlBase}/${spell.index}`);
    setSelectedSpell(response.data);
    // If the spell is saved, save the full response in context to be used if clicked on again
    if (matchingSpell) {
      var newSavedSpells = savedSpells.filter((savedSpell) => {
        return savedSpell.index !== spell.index;
      });
      setSavedSpells([...newSavedSpells, response.data]);
    }
  };

  // Toggles between saved and not saved
  const saveSpellToggle = (spell) => {
    var newSpells = [];
    if (savedSpells.map((s) => s.index).includes(spell.index)) {
      // Remove the spell if it's already saved
      newSpells = savedSpells.filter((savedSpell) => {
        return savedSpell.index !== spell.index;
      });
    } else {
      // Add the spell if it isn't saved
      newSpells = [...savedSpells, spell];
    }
    setSavedSpells(newSpells);
    window.localStorage.setItem(
      "savedSpells",
      JSON.stringify(
        newSpells.map((s) => {
          return {
            name: s.name,
            index: s.index,
            level: s.level,
          };
        })
      )
    );
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

export { SpellsContextProvider };
export default SpellsContext;
