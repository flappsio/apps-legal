import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CrosshairStateProvider } from "@/context/CrosshairStateContext";
import App from "./App";
import "./index.css";

hydrateRoot(document.getElementById("root")!,
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
