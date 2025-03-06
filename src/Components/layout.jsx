import { useContext, useState } from "react";
import Header from "./header";
import SidebarLeft from "./sidebarLeft"; // Left Sidebar Component
import SidebarRight from "./sidebarRight"; // Right Sidebar Component
import { ThemeContext } from "../context/themeContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { themeColors } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState(""); // Declare the inputValue state properly

  // Function to handle button click or form submit
  const handleSubmit = () => {
    console.log("Input Value:", inputValue);
    setInputValue(""); // Optionally clear input after submit
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
      }}
    >
      {/* Header (fixed at the top) */}
      <Header />

      {/* Main Content and Sidebar Area */}
      <div className="flex mt-[60px] flex-1"> {/* Margin-top to avoid overlap with the header */}
        {/* Left Sidebar */}
        <SidebarLeft />

        {/* Main Content Area */}
        <div className="w-full ml-16 md:ml-56 mr-16 md:mr-72 p-4 overflow-y-auto flex-1">
          <Outlet />
          
          {/* Example Content */}
          <div className="bg-white flex justify-center h-16 rounded-xl"></div>
          <div className="bg-white flex justify-center h-[150px] rounded-xl mt-5"></div>
          <div className="bg-white flex justify-center h-[150px] rounded-xl mt-5"></div>
          <div className="bg-white flex justify-center h-[200px] rounded-xl mt-5"></div>
        </div>

        {/* Right Sidebar */}
        <SidebarRight />
      </div>
    </div>
  );
};

export default Layout;
