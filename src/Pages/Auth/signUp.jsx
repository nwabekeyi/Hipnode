import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import useApi from "../../hooks/useApi";
import Button from "../../Components/button";
import { registerUser } from "../../api/userApi"; // API function

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for form inputs
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    username: "",
    dob: "",
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Use the useApi hook for registration
  const { execute: register, loading, error: apiError } = useApi(registerUser);

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

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await register(
          "http://localhost:5000/auth/register",
          "POST",
          formData,
        );
        console.log("Registration response:", result); // Debug response

        alert("Registration successful! Redirecting to login page...");

        // Redirect to the login page after 5 seconds
        setTimeout(() => {
          navigate("/login"); // Use navigate to redirect
        }, 5000); // 5000 milliseconds = 5 seconds
      } catch (err) {
        // Error is already handled by the useApi hook
        console.error("Registration error:", err);
      }
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Display API error */}
        {apiError && (
          <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
        )}

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
          )}
        </div>

        {/* Surname */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.surname ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
          )}
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Password */}
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
          className="w-full"
          text={loading ? "Registering..." : "Register"}
          disabled={loading}
        />

        {/* Login Link */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
