import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppDataProvider } from "./contexts/AppDataProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <AppDataProvider>
      <Router>
        <App />
      </Router>
    </AppDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


