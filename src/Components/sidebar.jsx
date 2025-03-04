import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Sidebar = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4"
      style={{
        backgroundColor: themeColors?.background || "#f7f7f7", // Ensure fallback
        color: themeColors?.textColor || "#3f4354",
      }}
    >
      <div className="w-28 md:flex mb-8 text-red-700">LOGO</div>
      
      <div className="font-medium py-2 px-5 hover:bg-orange-500 hover:text-white cursor-pointer">
        <p>Dashboard</p>
        <p>Messages</p>
      </div>
    </div>
  );
};

export default Sidebar;
