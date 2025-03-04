import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Sidebar = () => {
  const { themeColors } = useContext(ThemeContext); // Get colors from ThemeContext

  return (
    <aside
      className="h-screen w-[200px] p-5"
      style={{
        backgroundColor: themeColors.background, // Sidebar background color
        color: themeColors.textColor, // Text color from theme
      }}
    >
      <ul>
        <li className="mb-3"> Dashboard</li>
        <li className="mb-3">Trending</li>
        <li className="mb-3">Saved Posts</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
