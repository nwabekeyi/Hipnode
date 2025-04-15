import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import { MessagingProvider } from "./context/messageContext"; // Import the MessagingProvider
import MyRoute from "./route";
import { ThemeProvider } from "./context/themeContext";
import { PublisherProvider } from "./context/publishContext";
import { AuthProvider } from "./context/authContext";

function App() {
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser?._id || null; // Extract _id safely

  return (
    // Wrap the app with the necessary providers
    <AuthProvider>
      <MessagingProvider userId={userId}>
        <UserProvider>
          <ThemeProvider>
            <PublisherProvider>
              <MyRoute />
            </PublisherProvider>
          </ThemeProvider>
        </UserProvider>
      </MessagingProvider>
    </AuthProvider>
  );
}

export default App;
