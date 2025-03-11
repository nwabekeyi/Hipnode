import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Button = ({
  text,
  bgBlue,
  /* bgOrange, */ route,
  onClick,
  /* className = "", */ ...props
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
