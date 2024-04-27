import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comfycorner from './Pages/Comfycorner';
import Category from './Pages/Category';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Comfycorner/>} />
            <Route path='/mens' element={<Category category='men'/>} />
            <Route path='/womens' element={<Category category='women'/>} />
            <Route path='products' element={<Products/>}>
              <Route path=':productId' element={<Products/>}/>
            </Route>
            <Route path='/cart' element={<Cart/>} />
            <Route path='/login' element={<LoginSignup/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
