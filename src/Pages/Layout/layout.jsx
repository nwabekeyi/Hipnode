import { useContext } from "react";
import Header from "./header";
import SidebarLeft from "./sidebarLeft"; // Left Sidebar Component
import SidebarRight from "./sidebarRight"; // Right Sidebar Component
import { ThemeContext } from "../../context/themeContext";
import MainContent from "./mainContent"; // Main Content Component

const Layout = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh",
      }}
    >
      {/* Header (fixed at the top) */}
      <Header />

      {/* Main Content and Sidebar Area */}
      <div className="flex mt-[60px] flex-1">
        {/* Left Sidebar */}
        <SidebarLeft />

        {/* Main Content */}
        <MainContent />

        {/* Right Sidebar */}
        <SidebarRight />
      </div>
    </div>
  );
};

export default Layout;
