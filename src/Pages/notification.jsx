import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Notifications = () => {
  const { themeColors } = useContext(ThemeContext); // Access theme colors

  return (
    <div
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-xl font-bold">Notifications</h1>
      <p>You have 3 new notifications.</p>
      <button
        style={{
          backgroundColor: themeColors.buttonColor2,
          color: themeColors.buttonColor2Text,
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        View All Notifications
      </button>
    </div>
  );
};

export default Notifications;
