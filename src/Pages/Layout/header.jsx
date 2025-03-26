import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/themeContext";
import {
  FaHome,
  FaCalendarAlt,
  FaComments,
  FaMicrophone,
  FaSearch,
  FaEnvelope,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaApple,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission (mock API call)
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Simulate API call
      setTimeout(() => {
        console.log(`Results for "${searchQuery}" fetched!`);
      }, 1000);
    }
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      setSearchQuery(event.results[0][0].transcript);
    };
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 h-16 z-50 shadow-md bg-white dark:bg-gray-900">
      {/* Logo */}
      <div className="logo">
        <h1 className="text-3xl p-2 font-bold text-gray-800 dark:text-white">
          Hipnode
        </h1>
      </div>

      {/* Navigation Icons */}
      <div className="flex gap-6">
        <Link to="/">
          <FaHome className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300" />
        </Link>
        <Link to="/calendar">
          <FaCalendarAlt className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300" />
        </Link>
        <Link to="/chat">
          <FaComments className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300" />
        </Link>
        <FaMicrophone
          className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300"
          onClick={handleVoiceSearch}
        />
      </div>

      {/* Search Bar */}
      <form
        className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 flex-1 max-w-md mx-4"
        onSubmit={handleSearchSubmit}
      >
        <FaSearch className="text-gray-600 dark:text-gray-300 mr-2" />
        <input
          type="text"
          placeholder="Type here to search..."
          className="bg-transparent outline-none flex-1 text-gray-700 dark:text-white placeholder-gray-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>

      {/* Right Side Icons and User Profile */}
      <div className="flex items-center gap-6 relative">
        <FaEnvelope className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300" />
        <FaBell className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300" />
        {/* Dark Mode Toggle */}
        <button onClick={() => toggleTheme()}>
          {theme !== 'light' ? (
            <FaSun className="text-xl text-yellow-500" />
          ) : (
            <FaMoon className="text-xl text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* User Profile Dropdown */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FaUserCircle className="text-xl text-gray-600 dark:text-gray-300" />
          <span className="text-sm text-gray-800 dark:text-white">
            Tracy
          </span>
          <FaChevronDown className="text-xs text-gray-600 dark:text-gray-300" />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-10">
            <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">
              Profile
            </p>
            <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">
              Settings
            </p>
            <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">
              Logout
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


