import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";
import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import MyRoute from "./Pages";

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
      <BrowserRouter>
        <UserProvider>
          <MyRoute />
        </UserProvider>
      </BrowserRouter>
      <button onClick={toggleTheme} style={buttonStyles}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
