import { useContext } from "react";
import { ThemeContext } from "./themeContext.jsx";

function App() {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  return (
    <div style={{
      backgroundColor: themeColors.background,
      color: themeColors.textColor,
      minHeight: "100vh",
      padding: "20px",
    }}>
      <h1 style={{ color: themeColors.primaryColor }}>Social Media Forum</h1>
      <button 
        onClick={toggleTheme}
        style={{
          backgroundColor: themeColors.buttonColor,
          color: themeColors.textColor,
          padding: "10px 20px",
          border: `1px solid ${themeColors.borderColor}`,
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
