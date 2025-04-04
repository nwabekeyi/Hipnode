import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const lightTheme = {
    headerColor: "#ffffff",
    background: "#f7f7f7",
    textColor: "#3f4354",
    secondaryColor: "#dcdfe1",
    navbarBg: "#d1daeb",
    navbarActiveBg: "#ff4400",
    inputBgPrimary: "#f3f6f8",
    inputBgSecondary: "#ffffff",
    labelText: "#666977",
    placeholderColor: "#dcdfe1",
    buttonOrangeBg: "#ff6833",
    buttonPrimaryText: "#f8f2f1",
    buttonBlueBg: "#3479e2",
    buttonSecondaryText: "#ffffff",
    lightOrangeColor: "#ffece6",
    lightOrangeColorText: "#ff8f66",
    darkOrangeColor: "#ff4400",
  };

  const darkTheme = {
    background: "#1d252a",
    textColor: "#f7f7f7",
    secondaryColor: "#e2e5e7",
    navbarBg: "#f3f6f8",
    navbarActiveBg: "#ff4400",
    inputBg: "#2c353d",
    placeholderPrimary: "#dcdfe1",
    placeholderSecondary: "#52575c",
    buttonPrimaryText: "#f8f2f1",
    buttonAccentBg: "#ff6833",
    buttonAccentText: "#ffffff",
    lightOrangeColor: "#ffece6",
    lightOrangeColorText: "#ff8f66",
    darkOrangeColor: "#ff4400",
    label: "#f7f7f7",
  };
  const [themeColors, setThemeColors] = useState(
    theme === "light" ? lightTheme : darkTheme,
  );
  console.log("Theme colors:", themeColors);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    setThemeColors(theme === "light" ? lightTheme : darkTheme);
  }, [theme]);

  const toggleTheme = () => {
    console.log("Toggle theme");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        themeColors: theme === "light" ? lightTheme : darkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
