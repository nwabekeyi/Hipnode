import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";
HEAD
import MyRoute from "./Pages";
import PublishingInterface from "./Components/PublishingInterface";
// import RichTextExample from "./Components/slate";
import MyRoutes from "./route";
1923cce4c45c8f7db669e71387b606ab7d4b5ede

function App() {
  const { /* theme, */ /* toggleTheme, */ themeColors } =
    useContext(ThemeContext);
  // let buttonStyles = {
  //   padding: "10px 5px",
  //   border: "none",
  //   cursor: "pointer",
  //   background:
  //     theme === "light" ? themeColors.buttonColor : themeColors.buttonColor2,
  //   color: themeColors.buttonColor1Text,
  // };

  return (
    <div
      style={{
        background: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh", // Ensures full page height
      }}
    >
<<<<<<< HEAD

      {/* <RichTextExample /> */}
      <MyRoute />

      <button onClick={toggleTheme} style={buttonStyles}>
        Toggle Theme
      </button>

      <PublishingInterface />
=======
      <MyRoutes />
      <MyRoutes /> {/* This renders your routes inside App */}
>>>>>>> 1923cce4c45c8f7db669e71387b606ab7d4b5ede
    </div>
  );
}

export default App;
