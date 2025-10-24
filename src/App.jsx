import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
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
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';

function App() {
  const location = useLocation();
  
  // Hide navbar for login, signup, and all admin pages
  const hideNavbar = location.pathname === '/login' || 
                     location.pathname === '/signup' || 
                     location.pathname.startsWith('/admin');

  return (
    <div>
      {!hideNavbar && <Navbar />}
      
      <Routes>
        {/* Customer Routes */}
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
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:orderNumber" element={<OrderDetails />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute>
              <OrderManagement />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #FFD700',
        borderRadius: '8px',
        padding: '3rem 2rem',
        maxWidth: '500px',
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
        <h1 style={{
          fontSize: '2rem',
          fontFamily: "'Cormorant Garamond', serif",
          color: '#FFD700',
          marginBottom: '1rem',
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#ccc',
          marginBottom: '2rem',
          lineHeight: '1.6',
        }}>
          Oops! The page you're looking for doesn't exist.<br />
          It might have been removed or the URL is incorrect.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            backgroundColor: '#FFD700',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
        >
          🏠 BACK TO HOME
        </a>
      </div>
    </div>
  );
}

export default App;
