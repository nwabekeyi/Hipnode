import React from "react";
import "./App.css"; // ✅ Corrected import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout/layout";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import LoginPage from "./Pages/Auth/Login";
import RegistrationForm from "./Pages/Auth/signUp";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Add other routes here */}
        </Route>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
