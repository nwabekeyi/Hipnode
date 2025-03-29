import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import { MessagingProvider } from "./context/messageContext"; // Import the MessagingProvider
import MyRoute from "./route";
import { ThemeProvider } from "./context/themeContext";
import { PublisherProvider } from "./context/publishContext";

function App() {
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser?._id || null; // Extract _id safely

  return (
    <MessagingProvider userId={userId}>
      <UserProvider>
        <ThemeProvider>
          <PublisherProvider>
            <MyRoute />
          </PublisherProvider>
        </ThemeProvider>
      </UserProvider>
    </MessagingProvider>
  );
}

export default App;
