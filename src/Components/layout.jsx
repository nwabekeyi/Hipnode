import { useContext } from "react";
import Sidebar from "../Components/sidebar";
import Navbar from "../Components/navbar";
import Dashboard from "./dashboard";
import PostCard from "../Components/postcard"; 
import { ThemeContext } from "../context/themeContext";

const Layout = () => {
  const { themeColors } = useContext(ThemeContext);

  if (!themeColors) {
    return <p>Loading theme...</p>; 
  }

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundColor: themeColors.background, 
        color: themeColors.textColor, 
      }}
    >
      {/* Sidebar (fixed width) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-5">
        <Navbar />
        <Dashboard />
        <PostCard />
      </div>
    </div>
  );
};

export default Layout;
