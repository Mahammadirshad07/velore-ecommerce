import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ForMen from './pages/ForMen';
import ForWomen from './pages/ForWomen';
import Niche from './pages/Niche';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

function App() {
  const location = useLocation();
  
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <div>
            {!hideNavbar && <Navbar />}
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/for-men" element={<ForMen />} />
              <Route path="/for-women" element={<ForWomen />} />
              <Route path="/niche" element={<Niche />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/account" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
