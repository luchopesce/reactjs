import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<ItemListContainer/>}/>
      <Route path='/detalle/:itemid' element={<ItemDetailContainer/>}/>
      <Route path='/categoria/:itemcategoria' element={<ItemListContainer/>}/>
      <Route path='*' element={<h1>Pagina no encontrada</h1>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
