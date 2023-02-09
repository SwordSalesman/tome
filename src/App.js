import { useContext, useEffect, useState } from "react";
import ContentPane from "./components/ContentPane";
import NavigationBar from "./components/NavigationBar";
import SpellCard from "./components/SpellCard/SpellCard";
import SpellList from "./components/SpellList/SpellList";
import SpellsContext from "./context/spellsContext";

function App() {
  const { fetchSpells } = useContext(SpellsContext);
  const [activePage, setActivePage] = useState("library");

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  const handlePageSelect = (page) => {
    setActivePage(page);
  };

  return (
    <div>
      <div className="absolute bg-gray-200 h-full "></div>
      <div className="text-3xl w-full border-b-2 mb-1 pt-2 pb-1 text-center font-medium">
        tome.io
      </div>
      <div className="flex justify-center">
        <div className="flex h-[90vh] max-w-5xl">
          <ContentPane className="w-1/3">
            <NavigationBar
              activePage={activePage}
              onPageSelect={handlePageSelect}
            />
            <SpellList page={activePage}></SpellList>
          </ContentPane>
          <ContentPane className="w-2/3">
            <SpellCard></SpellCard>
          </ContentPane>
        </div>
      </div>
    </div>
  );
}

export default App;
