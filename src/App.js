import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Router } from './routers/Router';
function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;

/**
 * TODO
 * 1. Make bookmark icon green when item is in the wishlist.
 * 2. add categories to products
 * 3. show toasts
 * 4. implement slider(carousal) make mobile friendly(slider contains different companies)
 */
