import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function ProductDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
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
      addToCart({ ...product, quantity: 1 });
      showToast(`Added ${product.brand} ${product.name} to cart!`, 'success');
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
      padding: isMobile ? '1.5rem 1rem' : '2rem',
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
      marginBottom: '1.5rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    productLayout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '45% 55%',
      gap: isMobile ? '1.5rem' : '2.5rem',
      alignItems: 'start',
    },
    imageSection: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: isMobile ? '1rem' : '1.5rem',
      border: '1px solid #2a2a2a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    productImage: {
      width: '100%',
      maxWidth: isMobile ? '280px' : '380px',
      height: isMobile ? '280px' : '380px',
      objectFit: 'contain',
      borderRadius: '8px',
    },
    detailsSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    brand: {
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      color: '#FFD700',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    },
    productName: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#fff',
      marginBottom: '0.3rem',
      lineHeight: '1.2',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
    stars: {
      fontSize: isMobile ? '0.95rem' : '1.1rem',
    },
    ratingText: {
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      color: '#ccc',
    },
    price: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      color: '#FFD700',
      fontWeight: 'bold',
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: '0.8rem',
    },
    description: {
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      color: '#ccc',
      lineHeight: '1.6',
      marginBottom: '1rem',
    },
    divider: {
      height: '1px',
      backgroundColor: '#2a2a2a',
      margin: '1rem 0',
    },
    detailItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.6rem',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    detailLabel: {
      color: '#999',
    },
    detailValue: {
      color: '#fff',
      fontWeight: '500',
    },
    addToCartButton: {
      width: '100%',
      padding: isMobile ? '0.9rem' : '1rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
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

            <button
              style={styles.addToCartButton}
              onClick={handleAddToCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFA500';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ADD TO CART 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
