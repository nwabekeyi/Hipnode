import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import ProjectStatictics from "../Components/projectStatictics";
import Platform from "../Components/platform";

const Home = () => {
  const { themeColors } = useContext(ThemeContext); 

  return (
    <div
    className="p-5"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh",
      }}
    >
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
