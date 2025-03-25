import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const lightTheme = {
    headerColor: "#ffffff",
    background: "#f7f7f7",
    textColor: "#3f4354",
    secondaryColor: "#dcdfe1",
    navbarBg: "#d1daeb", // Light Blue-Gray
    navbarActiveBg: "#ff4400", // Bright Red
    inputBgPrimary: "#f3f6f8", // Soft Light Gray
    inputBgSecondary: "#ffffff", // Pure White
    labelText: "#666977", // Muted Blue-Gray
    placeholderColor: "#dcdfe1", // Light Gray
    buttonOrangeBg: "#ff6833", // Bright Orange
    buttonPrimaryText: "#f8f2f1", // Soft White
    buttonBlueBg: "#3479e2", // Deep Blue
    buttonSecondaryText: "#ffffff", // Pure White
    lightOrangeColor: "#ffece6",
    lightOrangeColorText: "#ff8f66",
    darkOrangeColor: "#ff4400",
  };

  const darkTheme = {
    background: "#1d252a",
    textColor: "#f7f7f7",
    secondaryColor: "#e2e5e7",
    navbarBg: "#f3f6f8", // Soft Light Gray
    navbarActiveBg: "#ff4400", // Bright Red
    inputBg: "#2c353d", // Dark Gray
    placeholderPrimary: "#dcdfe1", // Light Gray
    placeholderSecondary: "#52575c", // Muted Dark Gray
    buttonPrimaryText: "#f8f2f1", // Soft White
    buttonAccentBg: "#ff6833", // Vibrant Orange
    buttonAccentText: "#ffffff", // Pure White
    lightOrangeColor: "#ffece6",
    lightOrangeColorText: "#ff8f66",
    darkOrangeColor: "#ff4400",
    label: "#f7f7f7",
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
