import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import MyRoute from "./route";
import { ThemeProvider } from "./context/themeContext";
import { PublisherProvider } from "./context/publishContext";

function App() {
  return (
     
      <UserProvider>
         <ThemeProvider>
        <PublisherProvider>
          <MyRoute />
        </PublisherProvider>
        </ThemeProvider>
      </UserProvider>
  );
}

export default App;
