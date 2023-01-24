import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import { CartProvider } from './storage/cartContext';
import CartContainer from './components/CartContainer/CartContainer';

function App() {
  return (
    <>
    <BrowserRouter>
    <CartProvider>
    <NavBar/>
    <Routes>
      <Route path='/' element={<ItemListContainer/>}/>
      <Route path='/detalle/:itemid' element={<ItemDetailContainer/>}/>
      <Route path='/categoria/:itemcategoria' element={<ItemListContainer/>}/>
      <Route path='/cart' element={<CartContainer/>}/>
      <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
    </CartProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
