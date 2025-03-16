import React, { createContext, useState, useContext } from "react";

// Create a context for user details
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage (if available)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user details
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user details to localStorage
  };

  // Function to clear user details (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user details from localStorage
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
