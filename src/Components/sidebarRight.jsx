import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const SidebarRight = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      className=" fixed right-0 top-[60px] w-full md:w-72 h-screen border-r pt-8 px-4 transition-all duration-300 overflow-y-auto"
      style={{
        backgroundColor: themeColors.sidebarColor,
        color: themeColors.textColor,
      }}
    >
      {/* Logo */}
      <div className="hidden md:flex items-center justify-center mb-3 underline">
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </div>

      {/* Sidebar Content */}
      <div className="bg-white h-[150px] w-[250px] rounded-2xl"></div>
      <div className="bg-white h-[150px] w-[250px] rounded-2xl mt-3"></div>
      <div className="bg-white h-[300px] w-[250px] rounded-2xl mt-5"></div>
      <div className="bg-white h-[280px] w-[20px] rounded-2xl mt-5"></div>
    </div>
  );
};

export default SidebarRight;
