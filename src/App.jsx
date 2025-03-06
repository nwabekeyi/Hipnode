import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/themeContext"; 
// import Home from "./Pages/home";
import Layout from "./Components/layout";


function App () {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);
  let buttonStyles = {
    padding: "10px 5px",
    border: "none",
    cursor: "pointer",
    background: theme === "light" ? themeColors.buttonColor :themeColors.buttonColor2,
    color: themeColors.buttonColor1Text,
  };
  

  
  return(
    <div
    style={{
      background: themeColors.background,
      color: themeColors.textColor,
      minHeight: "100vh", // Ensures full page height
    }}>


    <Router>
    <Routes>
      <Route path= "/" element= {<Layout/>}> 
      {/* <Route index element= {<Home/>}/>  */}
\      </Route>
    </Routes>
    </Router>

    <button
        onClick={toggleTheme}
        style={buttonStyles}
        // className="fixed top-4 right-4 p-2 rounded-md"
      >
        Toggle Theme
      </button>
    </div>
    
    
  )
}
 


// const App = () => {
  // const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  // let buttonStyles = {
  //   padding: "10px 5px",
  //   border: "none",
  //   cursor: "pointer",
  // };

  // if (theme === "light") {
  //   buttonStyles.background = themeColors.buttonColor1;
  //   buttonStyles.color = themeColors.buttonColor1Text;
  // } else {
  //   buttonStyles.background = themeColors.buttonColor2;
  //   buttonStyles.color = themeColors.buttonColor1Text;
  // }

//   return (
//     <div
//       className="h-screen w-screen overflow-hidden flex flex-col"
//       style={{
//         background: themeColors.background,
//         color: themeColors.textColor,
//       }}
//     >
//       <Router>
        
//         <div className="flex h-full">
         
//           <Sidebar className="w-[350px] h-full" />

          
//           <div className="flex-1 flex flex-col h-full">
            
//             <Navbar className="h-[60px]" />

//             <div className="flex-1 overflow-auto p-4">
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/notifications" element={<Notifications />} />
//               </Routes>
//             </div>
//           </div>

          
//           <div className="w-[350px] h-full overflow-auto pr-16 ">
//             <PostCard />
//           </div>
//         </div>
//       </Router>

      
      // <button
      //   onClick={toggleTheme}
      //   style={buttonStyles}
      //   className="fixed top-4 right-4 p-2 rounded-md"
      // >
      //   Toggle Theme
      // </button>
//     </div>
//   );
// };

export default App;
