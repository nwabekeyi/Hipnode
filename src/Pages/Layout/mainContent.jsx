// import React, { useContext } from "react";
// import { ThemeContext } from "../../context/themeContext"; // Adjust the path if necessary
import { Outlet } from "react-router-dom"; // For routing purposes

const MainContent = () => {
  // const { themeColors } = useContext(ThemeContext);

  return (
    <div 
   className="main-content w-full ml-16 md:ml-56 mr-16 md:mr-72 p-4 flex-1">
      <Outlet />

      {/* Example Content */}
      <div className="bg-white flex justify-center h-16 rounded-xl mt-5"></div>
      <div className="bg-white flex justify-center h-[150px] rounded-xl mt-5"></div>
      <div className="bg-white flex justify-center h-[150px] rounded-xl mt-5"></div>
      <div className="bg-white flex justify-center h-[250px] rounded-xl mt-5"></div>
      <div className="bg-white flex justify-center h-[250px] rounded-xl mt-5"></div>

      
    </div>
  );
};

export default MainContent;
