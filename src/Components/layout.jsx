import { useContext } from "react";
import Sidebar from "../Components/sidebar";
import Header from "./header";
import { ThemeContext } from "../context/themeContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen flex "
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
      }}
    >
      
      <Sidebar />

      
      <div className="w-full ml-16 md:ml-56">
        
        <Header />

        {/* Outlet (for dynamic page content) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
