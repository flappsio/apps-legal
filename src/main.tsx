import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CrosshairStateProvider } from "@/context/CrosshairStateContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <CrosshairStateProvider>
            <App />
          </CrosshairStateProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
