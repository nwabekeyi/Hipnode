import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import ProjectStatictics from "../Components/projectStatictics";
import Platform from "../Components/platform";

const Home = () => {
  const { themeColors, theme, toggleTheme, } = useContext(ThemeContext); 


  let buttonStyles = {
    padding: "10px 5px",
    cursor: "pointer",
    background: theme === "light" ? themeColors.buttonColor1 :themeColors.buttonColor2,
    color: themeColors.buttonColor1Text,
  };


  return (
    <div
    className="p-5"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh",
      }}
    >

<button
        onClick={toggleTheme}
        style={buttonStyles}
        // className="fixed top-4 right-4 p-2 rounded-md"
      >
        Toggle Theme
      </button>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <ProjectStatictics/>
        <Platform/>
        <ProjectStatictics/> 
        <Platform/>
      </div>
    </div>
  );
};

export default Home;
