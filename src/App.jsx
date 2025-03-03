import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/themeContext"; // Ensure the correct import
import Navbar from "./Components/navbar"; // Ensure case is correct
import Sidebar from "./Components/sidebar"; // Ensure case is correct
import Dashboard from "./Components/dashboard"; // Import the Dashboard component
import Home from "./Pages/home"; // Ensure case is correct
import Profile from "./Pages/profile"; // Ensure case is correct
import Notifications from "./Pages/notification"; // Ensure case is correct
import PostCard from "./Components/postcard";

const App = () => {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  let buttonStyles = {
    padding: "10px 10px",
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
    <div
      style={{
        background: themeColors.background,
        color: themeColors.textColor,
        padding: "20px",
        height: "100vh", // Ensures full viewport height
      }}
    >
      <Router>
        <div className="flex h-full  overflow-hidden" >
          
          <Sidebar />
          <div className="flex-1 flex flex-col">
            
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>

            <PostCard />
          </div>
          
          
        </div>
      </Router>

      {/* Toggle button at the top-right of the screen */}
      <button
        onClick={toggleTheme}
        style={buttonStyles}
        className="fixed top-4 right-4 p-2 rounded-md"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
