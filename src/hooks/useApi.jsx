import { useState } from "react";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/refresh-token", {
        method: "POST",
        credentials: "include", // Include cookies (refresh token)
      });

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const { accessToken, expiresIn } = await response.json();
      const expiryTime = Date.now() + expiresIn * 1000; // Convert to milliseconds
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("accessTokenExpiry", expiryTime);
      return accessToken;
    } catch (err) {
      console.error("Token refresh error:", err);
      sessionStorage.removeItem("accessToken"); // Clear the expired access token
      sessionStorage.removeItem("accessTokenExpiry");
      throw err;
    }
  };

  // Function to check if the access token is about to expire
  const isAccessTokenAboutToExpire = () => {
    const expiryTime = sessionStorage.getItem("accessTokenExpiry");
    if (!expiryTime) return true; // No token, treat as expired

    const timeLeft = expiryTime - Date.now();
    return timeLeft < 3 * 60 * 1000; // 3 minutes in milliseconds
  };

  const execute = async (url, method = "GET", body = null, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Check if the access token is about to expire (only for authenticated requests)
      if (options.isLogin && isAccessTokenAboutToExpire()) {
        await refreshAccessToken(); // Refresh the token
      }

      // Get the access token from sessionStorage (only for authenticated requests)
      const accessToken = sessionStorage.getItem("accessToken");

      const headers = {
        "Content-Type": "application/json",
        ...options.headers, // Include custom headers
      };

      // Add the access token to the headers if it exists (only for authenticated requests)
      if (accessToken && !options.isLogin) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      setData(responseData);

      // Handle login-specific logic (e.g., save access token and expiry time)
      if (options.isLogin) {
        const { accessToken, expiresIn } = responseData; // Assuming the backend returns `accessToken` and `expiresIn`
        const expiryTime = Date.now() + expiresIn * 1000; // Convert to milliseconds
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("accessTokenExpiry", expiryTime);
      }

      return responseData;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
};

export default useApi;
