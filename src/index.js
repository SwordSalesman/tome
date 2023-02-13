import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { SpellsContextProvider } from "./context/spellsContext.js";
import { ThemeContextProvider } from "./context/themeContext.js";
import "./index.css";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <ThemeContextProvider>
    <SpellsContextProvider>
      <App />
    </SpellsContextProvider>
  </ThemeContextProvider>
);
