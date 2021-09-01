import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import "./index.css";

import { ToastProvider, AuthProvider, AppDataProvider } from "./contexts";

import { Home } from "./pages/Home/Home";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <AppDataProvider>
            <Home />
          </AppDataProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
