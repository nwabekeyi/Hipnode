import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Button = ({
<<<<<<< HEAD
  text,
  bgBlue,
  /* bgOrange, */ route,
  onClick,
  /* className = "", */ ...props
=======
  children, // Text or Icon
  backgroundColor,
  color = "text-white",
  borderRadius = "rounded-md",
  padding = "px-4 py-2",
  route, // If provided, it will be a Link
  onClick, // If provided, it calls a function
  className = "", // Allows extra custom styles
  ...props
>>>>>>> 5de7d51 (feat: Added inputField and mainContent)
}) => {
  const { themeColors } = useContext(ThemeContext); // Get theme colors from context

  const bgColor = bgBlue
    ? themeColors.buttonBlueBg
    : themeColors.buttonOrangeBg; // Use theme if available
  console.log(bgColor);

  const baseClasses = `bg-[${bgColor}] p-4 text-white rounded-md`;

  return route ? (
    <Link to={route} className={baseClasses} {...props}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} className={baseClasses} {...props}>
      {text}
    </button>
  );
};

export default Button;
