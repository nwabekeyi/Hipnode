import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";
import MyRoute from "./Pages";
import PublishingInterface from "./Components/PublishingInterface";
// import RichTextExample from "./Components/slate";

function App() {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);
  let buttonStyles = {
    padding: "10px 5px",
    border: "none",
    cursor: "pointer",
    background:
      theme === "light" ? themeColors.buttonColor : themeColors.buttonColor2,
    color: themeColors.buttonColor1Text,
  };

  return (
    <div
      style={{
        background: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh", // Ensures full page height
      }}
    >

      {/* <RichTextExample /> */}
      <MyRoute />

      <button onClick={toggleTheme} style={buttonStyles}>
        Toggle Theme
      </button>

      <PublishingInterface />
    </div>
  );
}

export default App;
