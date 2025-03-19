import MyRoutes from "./route";
import { ThemeProvider } from "./context/themeContext";
import { PublisherProvider } from "./context/publishContext";

function App() {

  return (
    <PublisherProvider>
       <ThemeProvider>
            <MyRoutes />
    </ThemeProvider>
    </PublisherProvider>
   
  );
}

export default App;
