import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import Dashboard from "../Components/dashboard";
import Sidebar from "../Components/sidebar";
import PostCard from "../Components/postcard";

const Home = () => {
  const { themeColors } = useContext(ThemeContext); // Access theme colors

  return (
    <div
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textColor,
        minHeight: "100vh",
      }}
    >
      <Dashboard/>
      <Sidebar/>
      <PostCard/>
    </div>
  );
};

export default Home;
