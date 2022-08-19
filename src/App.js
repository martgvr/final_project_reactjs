import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContextProvider } from '../src/context/cartContext'

function App() {
  return (
    <>
      <BrowserRouter>

        <CartContextProvider>
          <NavBar />
          <div className="main__container">
            <Routes>
              <Route path='/' element={<ItemListContainer title={'Listado de productos'} />} />
              <Route path='/detail/:id' element={<ItemDetailContainer title={'Detalle de producto'} />} />
              <Route path='/category/:category' element={<ItemListContainer title={'Listado de productos'} />} />
              <Route path='/cart/' element={<Cart />} />
              <Route path='*' element={<h1>Error 404. Nada encontrado</h1>} />
            </Routes>
          </div>
          <Footer />
        </CartContextProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
