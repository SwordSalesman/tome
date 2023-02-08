import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Provider } from "./context/spellsContext.js";
import Background from "./components/Background.js";
import "./index.css";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider>
    <App />
  </Provider>
);
