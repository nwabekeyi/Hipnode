import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


  const lightTheme = {
    background: "#ffffff",
    textColor: "#3f4354",
    secondaryColor: "#dcdfe1",
    navbarColor: "#d1daeb",
    clickedNavbarColor: "#ff4400",
    input1: "#f3f6f8",
    input2: "ffffff",
    label: "#666977",
    placeholder: "#dcdfe1",
    placeholder2: "#dcdfe1",
    buttonColor1: "#ff6833",
    buttonColor1Text: "#f8f2f1",
    buttonColor2: "#3479e2",
    buttonColor2Text: "#ffffff",
    lightOrangeColor: "#ffece6",
    lightOrangeColorText: "#ff8f66",
    darkOrangeColor: "#ff4400",
    
  };

  const darkTheme = {
    background: "#1d252a",
    textColor: "#f7f7f7",
    secondaryColor: "#e2e5e7",
    navbarColor: "#f3f6f8",
    clickedNavbarColor: "#ff4400",
    input: "#2c353d",
    placeholder: "#dcdfe1",
    placeholder2: "#52575c",
    buttonColor1Text: "#f8f2f1",
    buttonColor2: "#ff6833",
    buttonColor2Text: "#ffffff",
    lightOrangeColor: "#ffece6",
    lightOrangeColorText: "#ff8f66",
    darkOrangeColor: "#ff4400",
    label: "#f7f7f7",
  };
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
