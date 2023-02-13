import { useContext, useEffect, useState } from "react";
import ContentPane from "./components/ContentPane";
import NavigationBar from "./components/NavigationBar";
import SpellCard from "./components/SpellCard/SpellCard";
import SpellList from "./components/SpellList/SpellList";
import SpellsContext from "./context/spellsContext";
import ThemeContext from "./context/themeContext";
import Button from "./components/Button";
import { BsMoonStars, BsSun } from "react-icons/bs";

function App() {
  const { fetchSpells } = useContext(SpellsContext);
  const { theme, themeMode, toggleTheme } = useContext(ThemeContext);
  const [activePage, setActivePage] = useState("library");

  useEffect(() => {
    fetchSpells();
    const page = window.localStorage.getItem("openPage");
    handlePageSelect(page ? page : "library");
  }, [fetchSpells]);

  const handlePageSelect = (page) => {
    setActivePage(page);
    window.localStorage.setItem("openPage", page);
  };

  return (
    <div className={"h-[100vh] justify" + theme.app}>
      <div
        className={
          "text-3xl w-full border-b-2 mb-1 pt-2 pb-1 flex text-center justify-center font-medium" +
          theme.panel
        }
      >
        tome.io
        <Button
          className={"h-8 text-xl w-24 absolute right-1 top-1 pt-1"}
          onClick={() => toggleTheme()}
        >
          {themeMode === "dark" ? <BsMoonStars /> : <BsSun />}
        </Button>
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
