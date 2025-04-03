import { useState } from "react";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshAccessToken = async () => {
    try {
      console.log("Attempting to refresh access token...");
      const response = await fetch("http://localhost:5000/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Refresh token response error:", errorData);
        throw new Error(errorData.message || "Failed to refresh access token");
      }

      const { accessToken, expiresIn } = await response.json();
      const expiryTime = Date.now() + expiresIn * 1000;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("accessTokenExpiry", expiryTime);
      console.log("Access token refreshed successfully:", accessToken);
      return accessToken;
    } catch (err) {
      console.error("Token refresh error:", err.message);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessTokenExpiry");
      throw err;
    }
  };

  const isAccessTokenAboutToExpire = () => {
    const expiryTime = sessionStorage.getItem("accessTokenExpiry");
    if (!expiryTime) {
      console.log("No access token expiry found, treating as expired.");
      return true;
    }

    const timeLeft = expiryTime - Date.now();
    const isAboutToExpire = timeLeft < 3 * 60 * 1000;
    console.log(
      `Access token time left: ${timeLeft}ms, about to expire: ${isAboutToExpire}`,
    );
    return isAboutToExpire;
  };

  const execute = async (url, method = "GET", body = null, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      let accessToken = sessionStorage.getItem("accessToken");
      console.log("Initial access token:", accessToken);
      if (accessToken && isAccessTokenAboutToExpire()) {
        accessToken = await refreshAccessToken();
      }

      const updatedAccessToken = sessionStorage.getItem("accessToken");
      console.log(
        "Updated access token after refresh check:",
        updatedAccessToken,
      );

      const headers = {
        ...options.headers,
      };

      if (!headers["Content-Type"] && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      if (updatedAccessToken && !options.isLogin) {
        headers.Authorization = `Bearer ${updatedAccessToken}`;
        console.log("Authorization header set:", headers.Authorization);
      } else {
        console.log(
          "No Authorization header set. isLogin:",
          options.isLogin,
          "Token exists:",
          !!updatedAccessToken,
        );
      }

      const fetchOptions = {
        method,
        headers,
        body:
          body instanceof FormData ? body : body ? JSON.stringify(body) : null,
        credentials: "include",
      };

      console.log(
        `Making ${method} request to ${url} with headers:`,
        fetchOptions.headers,
      );
      console.log(
        "Request body instanceof FormData:",
        body instanceof FormData,
      );

      let response = await fetch(url, fetchOptions);

      if (response.status === 401 && !options.isLogin) {
        console.log("Received 401, attempting to refresh token...");
        accessToken = await refreshAccessToken();
        headers.Authorization = `Bearer ${accessToken}`;
        fetchOptions.headers = headers;

        console.log("Retrying request with new token:", headers.Authorization);
        response = await fetch(url, fetchOptions);
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error response from ${url}:`, errorData);
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      console.log(`Response from ${url}:`, responseData);
      setData(responseData);

      if (options.isLogin) {
        const { accessToken, expiresIn } = responseData;
        const expiryTime = Date.now() + expiresIn * 1000;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("accessTokenExpiry", expiryTime);
        console.log("Login successful, access token saved:", accessToken);
      }

      return responseData;
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error(`Error in ${method} request to ${url}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
};

export default useApi;
