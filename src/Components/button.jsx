import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Button = ({
  children, // Text or Icon
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
  const bgColor =
    backgroundColor || themeColors?.buttonPrimaryBg || "bg-blue-500"; // Use theme if available

  const baseClasses = `inline-flex items-center justify-center font-medium ${bgColor} ${color} ${borderRadius} ${padding} transition-all duration-300 hover:opacity-80 ${className}`;

  return route ? (
    <Link to={route} className={baseClasses} {...props}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={baseClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
