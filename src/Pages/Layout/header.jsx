import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";

const Header = () => {
  const { themeColors } = useContext(ThemeContext);

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the registration page
  };

  return (
    <div
      className="flex justify-between items-center p-4 min-h-38 w-full z-index-10000"
      style={{
        backgroundColor: themeColors.headerColor,
        color: themeColors.textColor,
      }}
    >
      <div className="w-28 md:flex mb-8 text-red-800 bg-white font-semibold">
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
              backgroundColor: themeColors.input1,
              color: themeColors.textColor,
            }}
          />
        </div>

        {/* Notification Button */}
        <div className="flex items-center space-x-5">
          <button
            className="relative text-2xl px-4 py-2 rounded-md"
            style={{
              backgroundColor: themeColors.buttonColor1,
              color: themeColors.buttonColor1Text,
            }}
            onClick={handleRegisterClick}
          >
            Hello!
            <span
              className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center text-[10px] w-5 h-4 rounded-full border-2 border-white"
              style={{
                backgroundColor: themeColors.buttonColor1Color,
                color: themeColors.buttonColor1TextColor,
              }}
            >
              15
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
