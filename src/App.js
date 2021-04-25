import './App.css';
import { ProductList } from './pages/ProductList';
import { Cart } from './pages/Cart';
import { WishListCard } from "./components/ProductCard/WishListCard";
import { WishList } from "./pages/WishList";
function App() {
  return (
    <div className="App">
      {/* <Cart /> */}
      {/* <ProductList /> */}
      <WishList />
    </div>
  );
}

export default App;