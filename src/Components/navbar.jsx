import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Navbar = () => {
  const { themeColors } = useContext(ThemeContext); // Get themeColors from ThemeContext

  return (
    <nav
      className="w-200 p-5"
      style={{
        backgroundColor: themeColors.navbarColor, // Navbar background color
        color: themeColors.textColor, // Text color from theme
      }}
    >
      <h1 className="text-xl font-bold text-center">Navbar</h1>
    </nav>
  );
};

export default Navbar;
