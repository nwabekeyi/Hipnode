import React from "react";
import "./App.css"; // ✅ Corrected import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout/layout";
import PublishingInterface from "./Components/PublishingInterface"
import { useContext } from "react";
import { PublishContext } from "./context/publishContext";

const MyRoutes = () => {
  const {isPublisherOpen} = useContext(PublishContext);
  return (
    <div>
      {
        isPublisherOpen && <PublishingInterface />
      }
       <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Add other routes here */}
      </Route>
      </Routes>
    </Router>
    </div>
   
  );
};

export default MyRoutes;
