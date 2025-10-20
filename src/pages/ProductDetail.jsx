import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

function ProductDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      showToast(`Added ${quantity} x ${product.brand} ${product.name} to cart!`, 'success');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity });
      showToast('Redirecting to checkout...', 'success');
      setTimeout(() => {
        navigate('/checkout');
      }, 800);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      const wasInWishlist = isInWishlist(product.id);
      toggleWishlist(product);
      
      if (wasInWishlist) {
        showToast('Removed from wishlist', 'info');
      } else {
        showToast('Added to wishlist!', 'success');
      }
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
      maxWidth: '1200px',
      margin: '0 auto',
    },
    backButton: {
      backgroundColor: 'transparent',
      border: '1px solid #FFD700',
      color: '#FFD700',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginBottom: '2rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    productLayout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '3rem',
    },
    imageSection: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: isMobile ? '1.5rem' : '2rem',
      border: '1px solid #2a2a2a',
    },
    productImage: {
      width: '100%',
      height: isMobile ? '300px' : '500px',
      objectFit: 'cover',
      borderRadius: '8px',
    },
    detailsSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    brand: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#FFD700',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    },
    productName: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#fff',
      marginBottom: '0.5rem',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    stars: {
      fontSize: isMobile ? '1rem' : '1.2rem',
    },
    ratingText: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#ccc',
    },
    price: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      color: '#FFD700',
      fontWeight: 'bold',
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: '1rem',
    },
    description: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: '#ccc',
      lineHeight: '1.8',
      marginBottom: '1.5rem',
    },
    divider: {
      height: '1px',
      backgroundColor: '#2a2a2a',
      margin: '1.5rem 0',
    },
    detailItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    detailLabel: {
      color: '#999',
    },
    detailValue: {
      color: '#fff',
      fontWeight: '500',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
    },
    quantityButton: {
      width: isMobile ? '40px' : '45px',
      height: isMobile ? '40px' : '45px',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    quantityDisplay: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      color: '#fff',
      fontWeight: 'bold',
      minWidth: '50px',
      textAlign: 'center',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '1rem',
    },
    addToCartButton: {
      flex: 1,
      padding: '1rem 2rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    wishlistButtonDetail: {
      flex: 1,
      padding: '1rem',
      backgroundColor: 'transparent',
      border: '2px solid #FFD700',
      borderRadius: '6px',
      color: '#FFD700',
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    buyNowButton: {
      flex: 1,
      padding: '1rem 2rem',
      backgroundColor: 'transparent',
      border: '2px solid #FFD700',
      borderRadius: '6px',
      color: '#FFD700',
      fontSize: isMobile ? '1rem' : '1.1rem',
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
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Product not found</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD700';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FFD700';
          }}
        >
          ← Back
        </button>

        <div style={styles.productLayout}>
          <div style={styles.imageSection}>
            <img src={product.image} alt={product.name} style={styles.productImage} />
          </div>

          <div style={styles.detailsSection}>
            <div style={styles.brand}>{product.brand}</div>
            <h1 style={styles.productName}>{product.name}</h1>

            <div style={styles.ratingContainer}>
              <span style={styles.stars}>{renderStars(product.rating)}</span>
              <span style={styles.ratingText}>({product.rating} / 5)</span>
            </div>

            <div style={styles.price}>₹{product.price.toLocaleString('en-IN')}</div>

            <p style={styles.description}>{product.description}</p>

            <div style={styles.divider}></div>

            <div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Category:</span>
                <span style={styles.detailValue}>{product.category}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Brand:</span>
                <span style={styles.detailValue}>{product.brand}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Size:</span>
                <span style={styles.detailValue}>100ml EDP</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Stock:</span>
                <span style={styles.detailValue}>In Stock</span>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.actionsContainer}>
              <button
                style={styles.quantityButton}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
              >
                −
              </button>
              <span style={styles.quantityDisplay}>{quantity}</span>
              <button
                style={styles.quantityButton}
                onClick={() => setQuantity(quantity + 1)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
              >
                +
              </button>
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={styles.addToCartButton}
                onClick={handleAddToCart}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
              >
                ADD TO CART 🛒
              </button>

              <button
                style={styles.wishlistButtonDetail}
                onClick={handleToggleWishlist}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFD700';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFD700';
                }}
              >
                {isInWishlist(product.id) ? '❤️ IN WISHLIST' : '🤍 ADD TO WISHLIST'}
              </button>
            </div>

            <button
              style={styles.buyNowButton}
              onClick={handleBuyNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFD700';
              }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
