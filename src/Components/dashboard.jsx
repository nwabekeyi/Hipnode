import { useContext } from "react";
// import Sidebar from "../Components/sidebar";
// import Navbar from "../Components/navbar";
import { ThemeContext } from "../context/themeContext";

const Dashboard = () => {
  const { themeColors } = useContext(ThemeContext); // Get colors from ThemeContext

  return (
    <div
      // className="h-full w-300"
      style={{
        backgroundColor: themeColors.background, // Set the background color
        color: themeColors.textColor, // Set the text color
      }}
    >
      
    </div>
  );

  
};

export default Dashboard;
