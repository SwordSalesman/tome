import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState({});
  const [themeMode, setThemeMode] = useState(
    window.localStorage.getItem("theme")
  );

  const toggleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themeMode === "dark" ? "light" : "dark");
    root.classList.add(themeMode);

    const themeObj = {
      app: " bg-gray-100 dark:bg-slate-900",
      panel:
        " bg-white dark:bg-slate-800 " +
        " text-black dark:text-white " +
        " border-gray-200 dark:border-slate-700",
      clickableInactive:
        " bg-white dark:bg-slate-800 " +
        " text-black dark:text-white border-gray-200 dark:border-slate-700 " +
        " hover:bg-gray-100 dark:hover:bg-slate-700 hover:border-gray-200 dark:hover:border-slate-600 " +
        " cursor-pointer ",
      clickableActive:
        " bg-blue-500 dark:bg-blue-500 " +
        " text-white border-blue-600 dark:border-blue-400 " +
        " hover:bg-blue-400 dark:hover:bg-blue-400 hover:border-blue-500 hover:border-blue-500 " +
        " cursor-pointer ",
      divider:
        " bg-gray-100 dark:bg-slate-900 " +
        " text-gray-400 dark:text-gray-600 " +
        " italic justify-center " +
        " border-gray-200 dark:border-slate-700",
      highlight:
        " bg-blue-200 dark:bg-[#2d4587] " +
        " border-gray-200 dark:border-slate-700 " +
        " hover:bg-blue-300 dark:hover:bg-[#3d57a1] " +
        " cursor-pointer ",
    };

    setTheme(themeObj);
    window.localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const themeContext = {
    theme,
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider };
export default ThemeContext;
