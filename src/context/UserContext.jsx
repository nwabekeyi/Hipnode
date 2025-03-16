import React, { createContext, useState, useContext } from "react";

// Create a context for user details
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from sessionStorage (if available)
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user details
  const updateUser = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData)); // Save user details to sessionStorage
  };

  // Function to clear user details (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    sessionStorage.removeItem("user"); // Remove user details from sessionStorage
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
