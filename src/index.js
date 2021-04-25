import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppDataProvider } from "./contexts/AppDataProvider";
ReactDOM.render(
  <React.StrictMode>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


