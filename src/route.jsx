import React from "react";
import "./App.css"; // ✅ Corrected import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout/layout";
import PublishingInterface from "./Components/PublishingInterface";
import { useContext } from "react";
import { PublishContext } from "./context/publishContext";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import LoginPage from "./Pages/Auth/Login";
import RegistrationForm from "./Pages/Auth/signUp";
import ChatPage from "./Pages/Layout/messaging";
import Modal from "./Components/modal";

const MyRoutes = () => {
  const { isPublisherOpen, closePublisher } = useContext(PublishContext);
  return (
    <div>
      <Modal isOpen={isPublisherOpen} onClose={closePublisher} size="full">
        <PublishingInterface />
      </Modal>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Add other routes here */}
          </Route>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MyRoutes;
