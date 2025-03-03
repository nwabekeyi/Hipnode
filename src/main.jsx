import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import Tailwind styles
import { ThemeProvider } from "./context/themeContext.jsx"; // Import ThemeProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>  {/* Wrap App inside ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
