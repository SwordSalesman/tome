import Button from "./Button";

function NavigationBar({ onPageSelect, activePage }) {
  return (
    <div className="flex justify-center h-9 mb-1">
      <Button
        active={activePage === "library"}
        onClick={() => onPageSelect("library")}
      >
        Library
      </Button>
      <Button
        active={activePage === "spellbook"}
        onClick={() => onPageSelect("spellbook")}
      >
        Spellbook
      </Button>
    </div>
  );
}

export default NavigationBar;
