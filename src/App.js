import logo from './logo.svg';
import './App.css';
import { ProductList } from './pages/ProductList';
import { Cart } from './pages/Cart';
function App() {
  return (
    <div className="App">
      <Cart />
      {/* <ProductList /> */}
    </div>
  );
}

export default App;