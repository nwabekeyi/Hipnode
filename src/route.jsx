import React from "react";
import "./App.css"; // ✅ Corrected import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout/layout";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default MyRoutes;
