import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/button";
import useApi from "../../hooks/useApi";

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // State for form inputs
  const [email, setEmail] = useState("");

  // State for validation errors
  const [error, setError] = useState("");

  // State for success message
  const [successMessage, setSuccessMessage] = useState("");

  // Use the useApi hook
  const { execute: callApi, loading } = useApi();

  // Handle input changes
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate email
  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail()) {
      try {
        // Call the forgot password API
        const response = await callApi(
          "http://localhost:5000/auth/forgot-password",
          "POST",
          { email },
        );

        // Display success message
        setSuccessMessage(
          response.message || "Password reset link sent to your email.",
        );
        setError("");
      } catch (err) {
        console.error("Forgot password error:", err);
        setError(err.message || "An error occurred. Please try again.");
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {/* Display success message */}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4 text-center">
            {successMessage}
          </p>
        )}

        {/* Display error message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        {/* Back to Login Link */}
        <p className="mt-4 text-center">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
