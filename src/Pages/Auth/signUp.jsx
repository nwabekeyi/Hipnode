import React, { useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Button from "../../Components/button";
import { registerUser } from "../../api/userApi";
import { motion } from "framer-motion"; // Import Framer Motion

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    username: "",
    dob: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { execute: register, loading, error: apiError } = useApi(registerUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData);
        alert("Registration successful!");
        setFormData({
          firstname: "",
          surname: "",
          username: "",
          dob: "",
          email: "",
          password: "",
        });
      } catch (err) {
        console.error("Registration error:", err);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="h-screen overflow-y-auto">
        <div className="flex items-center justify-center p-4">
          <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-sm my-8">
            {/* Left Section */}
            <motion.div
              variants={itemVariants}
              className="w-full md:w-2/5 p-4 md:p-8 flex flex-col justify-start"
            >
              <div>
                <div className="flex items-center mb-4 md:mb-8 -ml-1">
                  <div className="w-6 h-6 bg-gray-900 text-white flex items-center justify-center rounded text-sm font-bold mr-2">
                    h
                  </div>
                  <span className="text-[#FF4401] text-lg font-semibold">
                    Hipnode.
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-8">
                  Join a thriving community of entrepreneurs and developers.
                </h1>
                <div className="space-y-3 md:space-y-4">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start bg-[#FFF8F6] p-3 md:p-4 rounded-lg"
                  >
                    <div className="mr-3 p-1.5 md:p-2 bg-[#FFE8E2] rounded">
                      <span
                        role="img"
                        aria-label="connect"
                        className="text-base md:text-lg"
                      >
                        🎁
                      </span>
                    </div>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Connect with other indie hackers running online
                      businesses.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start bg-[#FFF8F6] p-3 md:p-4 rounded-lg"
                  >
                    <div className="mr-3 p-1.5 md:p-2 bg-[#FFE8E2] rounded">
                      <span
                        role="img"
                        aria-label="feedback"
                        className="text-base md:text-lg"
                      >
                        💬
                      </span>
                    </div>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Get feedback on your business ideas, landing pages, and
                      more.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start bg-[#FFF8F6] p-3 md:p-4 rounded-lg"
                  >
                    <div className="mr-3 p-1.5 md:p-2 bg-[#FFE8E2] rounded">
                      <span
                        role="img"
                        aria-label="news"
                        className="text-base md:text-lg"
                      >
                        📨
                      </span>
                    </div>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Get the best new stories from founders in your inbox.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Section (Form) */}
            <div className="w-full md:w-3/5 bg-white p-4 md:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-3 w-full max-w-md mx-auto"
              >
                {apiError && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-red-50 border border-red-200 text-red-600 px-3 md:px-4 py-2 md:py-3 rounded-md mb-4"
                  >
                    <p className="text-xs md:text-sm">{apiError}</p>
                  </motion.div>
                )}

                {/* Form Fields */}
                <motion.div variants={itemVariants}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                    placeholder="Enter your first name"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.firstname}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                    placeholder="Enter your surname"
                  />
                  {errors.surname && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.surname}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.username}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-0.5">{errors.dob}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-[#FF4401] text-white py-2 rounded-md hover:bg-[#FF4401]/90 transition-colors text-xs md:text-sm font-medium"
                    text={loading ? "Signing in..." : "Next"}
                    disabled={loading}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between my-3"
                >
                  <div className="w-full border-t border-gray-200"></div>
                  <span className="px-3 text-xs text-gray-500">or</span>
                  <div className="w-full border-t border-gray-200"></div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-gray-700 text-xs md:text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                    Sign up with Google
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-gray-700 text-xs md:text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                      />
                    </svg>
                    Sign up with Twitter
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-gray-700 text-xs md:text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"
                      />
                    </svg>
                    Sign up with Facebook
                  </button>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-center text-xs text-gray-600 mt-3"
                >
                  Already have an account?{" "}
                  <Link to="/Login" className="text-[#FF4401] hover:underline">
                    Sign in.
                  </Link>
                </motion.p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationForm;
