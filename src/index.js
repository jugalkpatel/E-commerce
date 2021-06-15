import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import App from './App';
import { AppDataProvider } from './contexts/AppDataProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { ToastProvider } from './contexts/ToastProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <AppDataProvider>
            <App />
          </AppDataProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
