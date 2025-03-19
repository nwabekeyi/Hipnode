import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useApi from "../hooks/useApi";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { execute: callApi } = useApi();

  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify the token with the backend
        const response = await callApi(
          "http://localhost:5000/auth/verify-token",
          "GET",
          null, // No body for GET request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          },
        );

        console.log("Token verification response:", response);

        // If the token is valid, allow access
        setIsAuthenticated(true);
      } catch (err) {
        // If the token is invalid, redirect to login
        setIsAuthenticated(false);
        console.log("Token verification error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [callApi]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
