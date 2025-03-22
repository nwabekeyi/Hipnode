import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { themeColors } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the registration page
  };

  const handleMessage = () => {
    navigate("/chat"); // Navigate to the registration page
  };

  return (
    <div
      className="header fixed top-0 left-0 w-full flex justify-between items-center p-4 min-h-16 z-50 shadow-md"
      style={{
        backgroundColor: themeColors.headerColor,
        color: themeColors.textColor,
      }}
    >
      <div
        className="w-28 md:flex text-red-800 bg-white font-semibold"
        onClick={handleMessage}
      >
        LOGO
      </div>

      <div>
        <h1 className="text-xl font-semibold">Welcome to Hipnode</h1>
        <p>Tracy</p>
      </div>

      <div className="flex items-center space-x-5">
        {/* Search Box */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: themeColors.inputBgPrimary,
              color: themeColors.textColor,
            }}
          />
        </div>

        {/* Notification Button */}
        <div className="flex items-center space-x-5">
          <button
            className="relative text-2xl px-4 py-2 rounded-md"
            style={{
              backgroundColor: themeColors.buttonOrangeBg,
              color: themeColors.buttonPrimaryText,
            }}
            onClick={handleLoginClick}
          >
            Hello!
            <span
              className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center text-[10px] w-5 h-4 rounded-full border-2 border-white"
              style={{
                backgroundColor: themeColors.buttonPrimaryBg,
                color: themeColors.buttonPrimaryText,
              }}
            >
              15
            </span>
          </button>

          {/* Theme Toggle Button */}
          {/* <button onClick={toggleTheme} style={buttonStyles}>
            Toggle Theme
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
