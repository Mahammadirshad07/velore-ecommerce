import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

function Wishlist() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✅ Added ${product.brand} ${product.name} to cart!`);
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return '⭐'.repeat(fullStars);
  };

  const styles = {
    container: {
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
      textAlign: 'center',
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#ccc',
    },
    emptyWishlist: {
      textAlign: 'center',
      padding: '4rem 2rem',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    emptyTitle: {
      fontSize: '1.5rem',
      color: '#FFD700',
      marginBottom: '1rem',
      fontFamily: "'Cormorant Garamond', serif",
    },
    emptyText: {
      color: '#ccc',
      marginBottom: '2rem',
    },
    shopButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    itemCount: {
      fontSize: '1rem',
      color: '#ccc',
    },
    clearButton: {
      padding: '0.6rem 1.5rem',
      backgroundColor: 'transparent',
      border: '2px solid #ff4444',
      borderRadius: '6px',
      color: '#ff4444',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    card: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'transform 0.3s ease',
      boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
    },
    removeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(255, 68, 68, 0.9)',
      border: 'none',
      borderRadius: '50%',
      color: '#fff',
      fontSize: '1.2rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      transition: 'all 0.3s ease',
    },
    imageContainer: {
      width: '100%',
      height: isMobile ? '180px' : '220px',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    info: {
      padding: isMobile ? '0.75rem' : '1rem',
    },
    brand: {
      fontSize: '0.75rem',
      color: '#FFD700',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
      marginBottom: '0.2rem',
      textTransform: 'uppercase',
    },
    name: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#fff',
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: '0.5rem',
    },
    stars: {
      fontSize: '0.8rem',
      marginBottom: '0.5rem',
    },
    price: {
      fontSize: isMobile ? '1.1rem' : '1.25rem',
      color: '#FFD700',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
      fontFamily: "'Cormorant Garamond', serif",
    },
    addButton: {
      width: '100%',
      padding: '0.65rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  if (wishlistItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>MY WISHLIST</h1>
            <p style={styles.subtitle}>Your favorite fragrances</p>
          </div>
          <div style={styles.emptyWishlist}>
            <div style={styles.emptyIcon}>❤️</div>
            <h2 style={styles.emptyTitle}>Your Wishlist is Empty</h2>
            <p style={styles.emptyText}>
              Start adding your favorite fragrances to your wishlist
            </p>
            <Link
              to="/"
              style={styles.shopButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
            >
              START SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>MY WISHLIST</h1>
          <p style={styles.subtitle}>Your favorite fragrances</p>
        </div>

        <div style={styles.topBar}>
          <div style={styles.itemCount}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in wishlist
          </div>
          <button
            style={styles.clearButton}
            onClick={clearWishlist}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4444';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ff4444';
            }}
          >
            CLEAR WISHLIST
          </button>
        </div>

        <div style={styles.grid}>
          {wishlistItems.map((product) => (
            <div key={product.id} style={styles.card}>
              <button
                style={styles.removeButton}
                onClick={() => handleRemove(product.id)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff0000'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.9)'}
                title="Remove from wishlist"
              >
                ✕
              </button>

              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={styles.imageContainer}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                </div>
                <div style={styles.info}>
                  <div style={styles.brand}>{product.brand}</div>
                  <div style={styles.name}>{product.name}</div>
                  <div style={styles.stars}>{renderStars(product.rating)}</div>
                  <div style={styles.price}>₹{product.price.toLocaleString('en-IN')}</div>
                </div>
              </Link>

              <div style={{ padding: '0 1rem 1rem' }}>
                <button
                  style={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                >
                  ADD TO CART 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
