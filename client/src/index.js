import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/userContext";
import SnackbarProvider from "../src/components/snackbar/SnackbarProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { TaskProvider } from "./context/taskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <UserProvider>
        <TaskProvider>
          <Router>
            <App />
          </Router>
        </TaskProvider>
      </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
