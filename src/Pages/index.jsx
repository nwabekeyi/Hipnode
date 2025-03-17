import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import RegistrationForm from "./Auth/signUp";
import LoginPage from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<div>Home Page Content</div>} />
        <Route path="about" element={<div>About Page Content</div>} />
      </Route>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default MyRoute;
