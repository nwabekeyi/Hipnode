import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/button";
import useApi from "../../hooks/useApi";
import { useUser } from "../../context/UserContext"; // Import the useUser hook

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { updateUser } = useUser(); // Get the updateUser function from UserContext

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Use the useApi hook
  const { execute: callApi, loading, error: apiError } = useApi();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Call the login API
        const response = await callApi(
          "http://localhost:5000/auth/login",
          "POST",
          formData,
        );

        // Save the access token and its expiry time
        const { accessToken, expiresIn, user } = response; // Assuming the backend returns `expiresIn` and `user`
        const expiryTime = Date.now() + expiresIn * 1000; // Convert to milliseconds
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("accessTokenExpiry", expiryTime);

        // Save the user details in the UserContext
        updateUser(user);

        // The refresh token is automatically stored as a cookie (handled by the browser)
        alert("Login successful!");
        navigate("/"); // Redirect to the dashboard or home page
      } catch (err) {
        console.error("Login error:", err);
        alert(err.message || "An error occurred during login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Display API error */}
        {apiError && (
          <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Registration Link */}
        <p className="mt-4 text-center">
          Do not have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <p className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
