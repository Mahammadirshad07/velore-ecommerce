import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

function Niche() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/db.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        return response.json();
      })
      .then(data => {
    
        const nicheProducts = data.products.filter(
          product => product.type === 'niche' || product.category === 'unisex'
        );
        setProducts(nicheProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`Added ${product.brand} ${product.name} to cart!`, 'success');
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wasInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    
    if (wasInWishlist) {
      showToast(`Removed ${product.brand} ${product.name} from wishlist`, 'info');
    } else {
      showToast(`Added ${product.brand} ${product.name} to wishlist!`, 'success');
    }
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
      letterSpacing: '0.1em',
    },
    subtitle: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#ccc',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    productCard: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
      cursor: 'pointer',
      position: 'relative',
    },
    wishlistButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '36px',
      height: '36px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: 'none',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'all 0.3s ease',
    },
    productImageContainer: {
      width: '100%',
      height: isMobile ? '180px' : '220px',
      backgroundColor: '#1a1a1a',
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    productInfo: {
      padding: isMobile ? '0.75rem' : '1rem',
    },
    productBrand: {
      fontSize: isMobile ? '0.7rem' : '0.75rem',
      color: '#FFD700',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
      marginBottom: '0.2rem',
      textTransform: 'uppercase',
    },
    productName: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#fff',
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: '0.5rem',
    },
    stars: {
      fontSize: isMobile ? '0.75rem' : '0.8rem',
      marginBottom: '0.5rem',
    },
    productPrice: {
      fontSize: isMobile ? '1.1rem' : '1.25rem',
      color: '#FFD700',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
      fontFamily: "'Cormorant Garamond', serif",
    },
    addToCartButton: {
      width: '100%',
      padding: isMobile ? '0.6rem' : '0.65rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    loading: {
      textAlign: 'center',
      color: '#FFD700',
      fontSize: '1.5rem',
      padding: '3rem',
    },
    error: {
      textAlign: 'center',
      color: '#ff4444',
      fontSize: '1.2rem',
      padding: '3rem',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          Error loading products: {error}
          <br />
          <small>Make sure db.json is in the public folder</small>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>NICHE FRAGRANCES</h1>
          <p style={styles.subtitle}>Exclusive Artisan Perfumes</p>
        </div>

        {products.length === 0 ? (
          <div style={styles.loading}>No products found</div>
        ) : (
          <div style={styles.productsGrid}>
            {products.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`} 
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={styles.productCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
                  }}
                >
                  <button
                    style={styles.wishlistButton}
                    onClick={(e) => handleToggleWishlist(e, product)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.9)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                    title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      fill={isInWishlist(product.id) ? '#ff4444' : 'none'} 
                      stroke={isInWishlist(product.id) ? '#ff4444' : '#fff'} 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>

                  <div style={styles.productImageContainer}>
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      style={styles.productImage}
                      loading="lazy"
                    />
                  </div>
                  <div style={styles.productInfo}>
                    <div style={styles.productBrand}>{product.brand}</div>
                    <div style={styles.productName}>{product.name}</div>
                    <div style={styles.stars}>{renderStars(product.rating)}</div>
                    <div style={styles.productPrice}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <button
                      style={styles.addToCartButton}
                      onClick={(e) => handleAddToCart(e, product)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                    >
                      ADD TO CART 🛒
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Niche;
