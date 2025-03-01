import { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [themeColors, setThemeColors] = useState(theme === "light" ? lightTheme : darkTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    setThemeColors(theme === "light" ? lightTheme : darkTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
