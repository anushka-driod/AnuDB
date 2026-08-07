import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { DatabaseProvider } from "./context/DatabaseContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <ThemeProvider>

        <DatabaseProvider>

          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />

        </DatabaseProvider>

      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>
);