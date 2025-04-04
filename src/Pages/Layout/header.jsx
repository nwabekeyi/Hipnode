import React, { useContext, useState } from "react";
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
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../../Components/Profile"; // Adjust path to your ProfileModal component

const Header = ({ onEnvelopeClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Get user info from sessionStorage
  const userInfo = JSON.parse(sessionStorage.getItem("user") || "{}");
  const currentUserName = userInfo.username || "User"; // Fallback to "User" if username not found
  const userId = userInfo._id; // Get userId from sessionStorage

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setTimeout(
        () => console.log(`Results for "${searchQuery}" fetched!`),
        1000,
      );
    }
  };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) =>
      setSearchQuery(event.results[0][0].transcript);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logged out successfully");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handlePost = () => {
    console.log("Post button clicked");
    // Add your post submission logic here
  };

  // Open the ProfileModal when "Profile" is clicked
  const handleProfileClick = () => {
    setIsDropdownOpen(false); // Close the dropdown
    setIsProfileModalOpen(true); // Open the ProfileModal
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 h-16 z-50 shadow-md ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <div className="logo">
          <Link to="/">
            <h1
              className={`text-3xl p-2 font-bold ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              Hipnode
            </h1>
          </Link>
        </div>

        <div className="flex gap-6">
          <Link to="/" title="Home">
            <FaHome
              className={`text-xl ${
                theme === "light"
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-gray-300 hover:text-white"
              } cursor-pointer`}
            />
          </Link>
          <Link to="/calendar" title="Calendar">
            <FaCalendarAlt
              className={`text-xl ${
                theme === "light"
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-gray-300 hover:text-white"
              } cursor-pointer`}
            />
          </Link>
          <Link to="/chat" title="Chat">
            <FaComments
              className={`text-xl ${
                theme === "light"
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-gray-300 hover:text-white"
              } cursor-pointer`}
            />
          </Link>
          <FaMicrophone
            className={`text-xl ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-800"
                : "text-gray-300 hover:text-white"
            } cursor-pointer`}
            onClick={handleVoiceSearch}
            title="Voice Search"
          />
        </div>

        <form
          className={`flex items-center ${
            theme === "light" ? "bg-gray-100" : "bg-gray-800"
          } rounded-full px-4 py-2 flex-1 max-w-md mx-4`}
          onSubmit={handleSearchSubmit}
        >
          <FaSearch
            className={theme === "light" ? "text-gray-600" : "text-gray-300"}
          />
          <input
            type="text"
            placeholder="Type here to search..."
            className={`bg-transparent outline-none flex-1 ${
              theme === "light"
                ? "text-gray-700 placeholder-gray-500"
                : "text-white placeholder-gray-400"
            }`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            onClick={handlePost}
            className={`ml-2 px-4 py-1 rounded-full text-sm font-semibold ${
              theme === "light"
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Post
          </button>
        </form>

        <div className="flex items-center gap-6 relative">
          <FaEnvelope
            className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300"
            onClick={onEnvelopeClick}
          />
          <FaBell className="text-xl text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-300" />
          <button onClick={() => toggleTheme()}>
            {theme !== "light" ? (
              <FaSun className="text-xl text-yellow-500" />
            ) : (
              <FaMoon className="text-xl text-gray-600 dark:text-gray-300" />
            )}
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle className="text-xl text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-800 dark:text-white">
              {currentUserName}
            </span>
            <FaChevronDown className="text-xs text-gray-600 dark:text-gray-300" />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-10">
              <p
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white"
                onClick={handleProfileClick}
              >
                Profile
              </p>
              <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white">
                Settings
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </header>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userId={userId}
      />
    </>
  );
};

export default Header;
