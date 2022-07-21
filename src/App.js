

import {useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import MainPage from './components/MainPage';
import Meals from './components/Meals/Meals';
import CartProvider from './components/ContextManagement/CartProvider';
import Footer from './components/Header/Footer';


function App() {

  const [showCartApp, setShowCartApp ] = useState(false)
  // const [showCart, setShowCart ] = useState(false)

  const showCartHandler =() =>{
    setShowCartApp(true)
  }
  const hideCartHandler =() =>{
    setShowCartApp(false)
  }
  return (
    <CartProvider>
    {showCartApp &&<Cart cartCloseBtn={hideCartHandler}/> }
      <Header openCart ={showCartHandler}/>
      <MainPage />
      <main>
        <Meals />
      </main>
      <footer>
        <Footer />
      </footer>
    </CartProvider>
  );
}

export default App;
