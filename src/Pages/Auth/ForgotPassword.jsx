import React, { useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Button from "../../Components/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { execute: resetPassword, loading } = useApi(async (email) => {
    // TODO: Implement the actual password reset API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Reset link sent to: ${email}`);
        setSuccess(true);
        resolve();
      }, 1000);
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await resetPassword(email);
    } catch {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-sm my-8">
        {/* Left Section */}
        <div className="w-full md:w-2/5 p-4 md:p-8 flex flex-col justify-start">
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
              Reset your password and get back to building.
            </h1>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start bg-[#FFF8F6] p-3 md:p-4 rounded-lg">
                <div className="mr-3 p-1.5 md:p-2 bg-[#FFE8E2] rounded">
                  <span
                    role="img"
                    aria-label="email"
                    className="text-base md:text-lg"
                  >
                    ✉️
                  </span>
                </div>
                <p className="text-gray-700 text-xs md:text-sm">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </p>
              </div>
              <div className="flex items-start bg-[#FFF8F6] p-3 md:p-4 rounded-lg">
                <div className="mr-3 p-1.5 md:p-2 bg-[#FFE8E2] rounded">
                  <span
                    role="img"
                    aria-label="security"
                    className="text-base md:text-lg"
                  >
                    🔒
                  </span>
                </div>
                <p className="text-gray-700 text-xs md:text-sm">
                  Your password reset link will be secure and expire after 24
                  hours.
                </p>
              </div>
              <div className="flex items-start bg-[#FFF8F6] p-3 md:p-4 rounded-lg">
                <div className="mr-3 p-1.5 md:p-2 bg-[#FFE8E2] rounded">
                  <span
                    role="img"
                    aria-label="help"
                    className="text-base md:text-lg"
                  >
                    ❓
                  </span>
                </div>
                <p className="text-gray-700 text-xs md:text-sm">
                  Need help? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-3/5 bg-white p-4 md:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 w-full max-w-md mx-auto"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 md:px-4 py-2 md:py-3 rounded-md mb-4">
                <p className="text-xs md:text-sm">{error}</p>
              </div>
            )}

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-600 px-3 md:px-4 py-2 md:py-3 rounded-md mb-4">
                <p className="text-xs md:text-sm">
                  Password reset instructions have been sent to your email
                  address.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 text-left">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF4401] focus:border-transparent text-xs md:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full bg-[#FF4401] text-white py-2 rounded-md hover:bg-[#FF4401]/90 transition-colors text-xs md:text-sm font-medium"
                text={loading ? "Sending..." : "Send Reset Link"}
                disabled={loading || success}
              />
            </div>

            <p className="text-center text-xs text-gray-600 mt-3">
              Remember your password?{" "}
              <Link to="/Login" className="text-[#FF4401] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
