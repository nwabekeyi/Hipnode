import { useContext } from "react";
import { ThemeContext } from "./themeContext";

const App = () => {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  return (
    <div style={{ background: themeColors.background, color: themeColors.text, padding: "20px", height: "100vh" }}>
      <h1>Current Theme: {theme}</h1>
      <button 
        onClick={toggleTheme} 
        style={{ background: themeColors.primary, color: "#fff", padding: "10px 20px", border: "none", cursor: "pointer" }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
