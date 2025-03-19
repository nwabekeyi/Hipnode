import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Button = ({
  bgBlue,
  text,
  backgroundColor,
  color = "text-white",
  borderRadius = "rounded-md",
  padding = "px-4 py-2",
  route, // If provided, it will be a Link
  onClick, // If provided, it calls a function
  className = "", // Allows extra custom styles
  ...props
}) => {
  const { themeColors } = useContext(ThemeContext); // Get theme colors from context

  // Determine the background color based on the theme
  const bgColor = bgBlue
    ? themeColors.buttonBlueBg
    : themeColors.buttonOrangeBg;

  // Use inline styles for dynamic background color
  const buttonStyle = {
    backgroundColor: bgColor,
  };
  console.log(backgroundColor);
  // Base Tailwind classes
  const baseClasses = `${color} ${borderRadius} ${padding} ${className}`;

  return route ? (
    <Link
      to={route}
      style={buttonStyle}
      className={`${baseClasses} inline-block text-center`}
      {...props}
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={baseClasses}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
