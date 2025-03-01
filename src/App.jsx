import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";

const App = () => {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  let buttonStyles = {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  };

  // Apply different styles for light and dark modes
  if (theme === "light") {
    buttonStyles.background = themeColors.buttonColor1;
    buttonStyles.color = themeColors.buttonColor1Text;
  } else {
    buttonStyles.background = themeColors.buttonColor2;
    buttonStyles.color = themeColors.buttonColor1Text;
  }

  return (
    <div style={{ background: themeColors.background, color: themeColors.textColor, padding: "20px", height: "100vh" }}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme} style={buttonStyles}>
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
