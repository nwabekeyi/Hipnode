
import React from "react";
import Layout from "../Pages/Layout/layout";  // Correct import path
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For routing

const Index = () => {
  return (
    <Router>
      {/* Define routes for different parts of the app */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Add any nested routes for dynamic content */}
          <Route path="home" element={<div>Home Page Content</div>} />
          <Route path="about" element={<div>About Page Content</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Index;
