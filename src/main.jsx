import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./themeContext.jsx"; // Import ThemeProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>  {/* Wrap App inside ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
