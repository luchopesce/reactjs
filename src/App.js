import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import { CartProvider } from './storage/cartContext';
import { AuthProvider } from './services/auth';
import CartContainer from './components/CartContainer/CartContainer';
import CheckOrdenContainer from './components/CheckOrdenContainer/CheckOrdenContainer';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import UserContainer from './components/Login/UserContainer'


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/detalle/:itemid' element={<ItemDetailContainer />} />
              <Route path='/category/:itemcategoria' element={<ItemListContainer />} />
              <Route path='/cart' element={<CartContainer />} />
              <Route path='cart/checkorden' element={<CheckOrdenContainer />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myaccount' element={<UserContainer />} />
              <Route path='*' element={<PageNotFound />}></Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
