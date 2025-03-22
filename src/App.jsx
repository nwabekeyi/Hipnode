import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";
import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import { MessagingProvider } from "./context/messageContext"; // Import the MessagingProvider
import MyRoute from "./route";

function App() {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser?._id || null; // Extract _id safely

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
      {/* Wrap the entire app with MessagingProvider */}
      <MessagingProvider userId={userId}>
        <UserProvider>
          <MyRoute />
        </UserProvider>
      </MessagingProvider>
      <button onClick={toggleTheme} style={buttonStyles}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
