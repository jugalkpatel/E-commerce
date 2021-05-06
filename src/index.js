import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppDataProvider } from "./contexts/AppDataProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppDataProvider>
        <Router>
          <App />
        </Router>
      </AppDataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


