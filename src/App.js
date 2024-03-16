import './App.css';
import Navbar from './Componenets/Navbar/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Shop from './Pages/Shop';
import Catagory from './Pages/Catagory';
import BikeProduct from './Pages/BikeProduct';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Footer from './Componenets/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/booking' element={<Catagory catogary="booking"/>}/>
        <Route path='/bikeproduct' element={<BikeProduct/>}>
          <Route path=':bikeproductId' element={<BikeProduct/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
