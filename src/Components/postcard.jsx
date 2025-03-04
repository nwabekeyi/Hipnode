import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const PostCard = () => {
  const { themeColors } = useContext(ThemeContext); // Get themeColors from ThemeContext

  return (
    <div
      className=""
      style={{
        backgroundColor: themeColors.backgroundColor, // Post card background color
        color: themeColors.textColor, // Text color from theme
      }}
    >
      <h2 className="text-xl font-bold">Post Card</h2>
      {/* <p>Some post content here...</p> */}
    </div>
  );
};

export default PostCard;


// const PostCard = ({ post }) => {
//   const { themeColors } = useContext(ThemeContext); 

//   return (
//     <div
//       className="w-64 h-64 p-5 "
//       style={{ backgroundColor: themeColors.navbarColor, color: themeColors.textColor }}
//     >
//         <h2>Post Card</h2>
//       <ul>
//         <li className="mb-3">
//           <Link to="/" style={{ color: themeColors.textColor }}>🏠 Dashboard</Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/trending" style={{ color: themeColors.textColor }}>🔥 Trending</Link>
//         </li>
//         <li className="mb-3">
//           <Link to="/saved" style={{ color: themeColors.textColor }}>💾 Saved Posts</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default PostCard;
