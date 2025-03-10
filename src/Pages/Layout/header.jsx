import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import Button from "../../Components/button";
// import { Link } from 'react-router-dom';

const Header = () => {
  const { themeColors } = useContext(ThemeContext);

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
          <Button bgOrange text="hello">
            Hello!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
