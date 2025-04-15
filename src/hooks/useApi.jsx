// src/hooks/useApi.js
import { useState } from "react";
import { useAuth } from "../context/authContext";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const refreshAccessToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");
      console.log("Refreshing token with refreshToken:", refreshToken);
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(
        "https://hipnode-server.onrender.com/auth/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to refresh token");
      }

      const { accessToken, expiresIn } = await response.json();
      const expiryTime = Date.now() + expiresIn * 1000;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("accessTokenExpiry", expiryTime);
      console.log("New access token:", accessToken);

      return accessToken;
    } catch (err) {
      console.error("Refresh token error:", err.message);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessTokenExpiry");
      sessionStorage.removeItem("user");
      logout();
      throw err;
    }
  };

  const isTokenExpiredOrAboutToExpire = () => {
    const expiryTime = sessionStorage.getItem("accessTokenExpiry");
    if (!expiryTime) return true;

    const timeLeft = parseInt(expiryTime) - Date.now();
    return timeLeft < 5 * 60 * 1000; // 5 minutes left
  };

  const execute = async (url, method = "GET", body = null, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        ...options.headers,
      };

      if (!headers["Content-Type"] && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      let accessToken = sessionStorage.getItem("accessToken");
      console.log("Initial accessToken:", accessToken);

      if (options.requiresAuth) {
        if (!accessToken && !sessionStorage.getItem("refreshToken")) {
          throw new Error("Please login to continue");
        }

        if (!accessToken || isTokenExpiredOrAboutToExpire()) {
          console.log("Token missing or about to expire, refreshing...");
          accessToken = await refreshAccessToken();
        }

        headers.Authorization = `Bearer ${accessToken}`;
      }

      const fetchOptions = {
        method,
        headers,
        body:
          body instanceof FormData ? body : body ? JSON.stringify(body) : null,
      };

      let response = await fetch(url, fetchOptions);
      console.log("Initial response status:", response.status);

      if (response.status === 401 && options.requiresAuth) {
        console.log("401 received, attempting token refresh...");
        const newAccessToken = await refreshAccessToken();
        headers.Authorization = `Bearer ${newAccessToken}`;
        fetchOptions.headers = headers;

        response = await fetch(url, fetchOptions);
        console.log("Retry response status:", response.status);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`,
        );
      }

      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (err) {
      console.error("API error:", err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
};

export default useApi;
