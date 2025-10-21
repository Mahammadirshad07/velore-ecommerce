import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const styles = {
    container: {
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      padding: isMobile ? '1.5rem 1rem' : '3rem 2rem',
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    title: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      textAlign: 'center',
      letterSpacing: '0.1em',
    },
    emptyCart: {
      textAlign: 'center',
      padding: isMobile ? '3rem 1rem' : '4rem 2rem',
    },
    emptyText: {
      fontSize: isMobile ? '1.1rem' : '1.5rem',
      color: '#999',
      marginBottom: '2rem',
    },
    shopButton: {
      padding: isMobile ? '0.75rem 1.5rem' : '0.875rem 2rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
      gap: isMobile ? '2rem' : '3rem',
    },
    cartItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    cartItem: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: isMobile ? '1rem' : '1.5rem',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '1.5rem',
      border: '1px solid #2a2a2a',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },
    itemImage: {
      width: isMobile ? '120px' : '120px',
      height: isMobile ? '120px' : '120px',
      objectFit: 'cover',
      borderRadius: '6px',
      backgroundColor: '#0a0a0a',
    },
    itemDetails: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: isMobile ? '0.75rem' : '0',
    },
    itemBrand: {
      fontSize: isMobile ? '0.7rem' : '0.85rem',
      color: '#FFD700',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    itemName: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: '#fff',
      fontFamily: "'Cormorant Garamond', serif",
      marginTop: '0.25rem',
    },
    itemPrice: {
      fontSize: isMobile ? '1.2rem' : '1.3rem',
      color: '#FFD700',
      fontWeight: 'bold',
      fontFamily: "'Cormorant Garamond', serif",
      marginTop: isMobile ? '0.5rem' : '0.5rem',
    },
    controlsWrapper: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      gap: isMobile ? '0.75rem' : '1rem',
      marginTop: isMobile ? '0.75rem' : '0.75rem',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: '0.75rem',
    },
    quantityButton: {
      width: isMobile ? '40px' : '35px',
      height: isMobile ? '40px' : '35px',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '1.3rem' : '1.4rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    quantity: {
      fontSize: isMobile ? '1.1rem' : '1.1rem',
      color: '#fff',
      fontWeight: 'bold',
      minWidth: isMobile ? '40px' : '40px',
      textAlign: 'center',
    },
    removeButton: {
      padding: isMobile ? '0.6rem 1rem' : '0.6rem 1.2rem',
      backgroundColor: 'transparent',
      color: '#ff4444',
      border: '1px solid #ff4444',
      borderRadius: '4px',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    summary: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: isMobile ? '1.5rem' : '2rem',
      border: '1px solid #2a2a2a',
      height: 'fit-content',
      position: isMobile ? 'relative' : 'sticky',
      top: isMobile ? '0' : '2rem',
    },
    summaryTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '1.5rem',
      letterSpacing: '0.05em',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      fontSize: isMobile ? '0.85rem' : '1rem',
      color: '#ccc',
      gap: '1rem',
    },
    divider: {
      height: '1px',
      backgroundColor: '#2a2a2a',
      margin: '1.5rem 0',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: 'bold',
      color: '#FFD700',
      fontFamily: "'Cormorant Garamond', serif'",
      gap: '1rem',
    },
    checkoutButton: {
      width: '100%',
      padding: isMobile ? '0.9rem' : '1rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'all 0.3s ease',
      letterSpacing: '0.05em',
    },
    clearButton: {
      width: '100%',
      padding: isMobile ? '0.7rem' : '0.75rem',
      backgroundColor: 'transparent',
      color: '#ff4444',
      border: '1px solid #ff4444',
      borderRadius: '4px',
      fontSize: isMobile ? '0.85rem' : '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
    },
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>SHOPPING CART</h1>
          <div style={styles.emptyCart}>
            <div style={{ fontSize: isMobile ? '4rem' : '5rem', marginBottom: '1rem' }}>🛒</div>
            <div style={styles.emptyText}>Your cart is empty</div>
            <Link
              to="/"
              style={styles.shopButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>SHOPPING CART</h1>
        
        <div style={styles.grid}>
          {/* Cart Items */}
          <div style={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.imageContainer}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                </div>
                
                <div style={styles.itemDetails}>
                  <div>
                    <div style={styles.itemBrand}>{item.brand}</div>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                  
                  <div style={styles.controlsWrapper}>
                    <div style={styles.quantityControls}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                      >
                        −
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      style={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ff4444';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#ff4444';
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            
            <div style={styles.summaryRow}>
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: '#4CAF50' }}>FREE</span>
            </div>
            
            <div style={styles.divider}></div>
            
            <div style={styles.totalRow}>
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <button
              style={styles.checkoutButton}
              onClick={handleCheckout}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
            >
              PROCEED TO CHECKOUT
            </button>
            
            <button
              style={styles.clearButton}
              onClick={clearCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff4444';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ff4444';
              }}
            >
              CLEAR CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
