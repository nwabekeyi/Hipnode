import React, { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

const SidebarLeft = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      className="sidebar-left fixed left-0 top-[60px] w-16 md:w-56 h-screen pt-8 px-4 transition-all duration-300 overflow-y-scroll"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
      }}
    >
      {/* Logo */}
      <div className="hidden md:flex items-center justify-center mb-3 underline">
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </div>

      <div className="bg-white h-[150px] w-[200px] rounded-2xl "></div>
      <div className="bg-white h-[300px] w-[200px] rounded-2xl mt-5"></div>
      <div className="bg-white h-[280px] w-[200px] rounded-2xl mt-5"></div>
      <div className="bg-white h-[280px] w-[200px] rounded-2xl mt-5"></div>
      <div className="bg-white h-[280px] w-[200px] rounded-2xl mt-5"></div>

      {/* Navigation Links */}
      {/* <nav className="flex flex-col space-y-4">
        <Link to="/" className="p-2 rounded-md hover:bg-gray-200">🏠 Home</Link>
        <Link to="/about" className="p-2 rounded-md hover:bg-gray-200">📖 About</Link>
        <Link to="/services" className="p-2 rounded-md hover:bg-gray-200">⚙️ Services</Link>
        <Link to="/contact" className="p-2 rounded-md hover:bg-gray-200">📞 Contact</Link>
      </nav> */}
    </div>
  );
};

export default SidebarLeft;
