import { useContext } from "react";
import Sidebar from "../Components/sidebar";
import Navbar from "../Components/navbar";
import PostCard from "../Components/postcard"; // Assuming this is where PostCard comes from
import { ThemeContext } from "../context/themeContext";

const Dashboard = () => {
  const { themeColors } = useContext(ThemeContext); // Get colors from ThemeContext

  return (
    <div
      className="h-full w-300"
      style={{
        backgroundColor: themeColors.background, // Set the background color
        color: themeColors.textColor, // Set the text color
      }}
    >
      {/* Sidebar - 200px width */}
      {/* <Sidebar /> */}

      {/* Navbar - Center content */}
      {/* <div className="flex justify-center items-center p-5"> */}
        {/* <Navbar /> */}
      {/* </div> */}

      {/* PostCard - 200px width */}
      {/* <PostCard /> */}
    </div>
  );

  
};

export default Dashboard;
