import './App.css';

import { ProductList } from './pages/ProductList';
import { Cart } from './pages/Cart';
import { WishList } from "./pages/WishList";
import { Header } from "./components/Header/Header";
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;

/**
 * TODO
 * 1. Price Dropdown should be close after clicking on the high-to-low and low-to-high filter.
 * 2. Make bookmark icon green when item is in the wishlist.
 * 3. post quantity to the server
 * 4. add categories to products
 * 5. show toasts
 * 6. implement slider(carousal) make mobile friendly(slider contains different companies)
 */