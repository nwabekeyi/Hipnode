// src/api/userApi.js
export const registerUser = async (userData) => {
  try {
    const response = await fetch(
      "https://hipnode-server.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    if (!response.ok) {
      // Try to parse error response as JSON
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      } catch {
        // If response is not JSON, throw generic error
        throw new Error("Unable to connect to server. Please try again later.");
      }
    }

    return response.json();
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to server. Please ensure the backend server is running.",
      );
    }
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(
      "https://hipnode-server.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    if (!response.ok) {
      // Try to parse error response as JSON
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      } catch {
        // If response is not JSON, throw generic error
        throw new Error("Unable to connect to server. Please try again later.");
      }
    }

    return response.json();
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to server. Please ensure the backend server is running.",
      );
    }
    throw error;
  }
};
