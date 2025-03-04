import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Navbar = () => {
  const { themeColors } = useContext(ThemeContext); 

  // return (
  //   <nav
  //     className="w-200 p-5"
  //     style={{
  //       backgroundColor: themeColors.backgroundColor, 
  //       color: themeColors.textColor, 
  //     }}
  //   >
  //     <h1 className="text-xl font-bold text-center">Navbar</h1>
  //   </nav>
  // );
};

export default Navbar;
