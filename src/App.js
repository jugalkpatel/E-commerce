import './App.css';
import { ProductList } from './pages/ProductList';
import { Cart } from './pages/Cart';
import { WishListCard } from "./components/ProductCard/WishListCard";
import { WishList } from "./pages/WishList";
import { Header } from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;