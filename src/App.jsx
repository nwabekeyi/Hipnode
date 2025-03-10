import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";
import MyRoutes from "./route";

function App() {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh", // Ensures full page height
      }}
    >
      <MyRoutes /> {/* This renders your routes inside App */}
    </div>
  );
}

export default App;
