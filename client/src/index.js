import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/userContext";
import SnackbarProvider from "../src/components/snackbar/SnackbarProvider";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <SnackbarProvider>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </SnackbarProvider>
  </React.StrictMode>
);
