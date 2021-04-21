import logo from './logo.svg';
import './App.css';
import { ProductList } from './pages/ProductList';
import { Sidebar } from "./components/Sidebar/Sidebar";
function App() {
  return (
    <div className="App">
      <ProductList />
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;