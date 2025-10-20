import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const bannerImages = [
    '/images/perfume-1.jpg',
    '/images/perfume-2.jpg',
    '/images/perfume-3.jpg',
    '/images/perfume-4.jpg',
    '/images/perfume-5.jpg',
  ];

  const categories = [
    {
      title: 'FOR MEN',
      image: '/images/categories/for-men.jpg',
      link: '/for-men',
      description: 'Bold & Masculine Fragrances'
    },
    {
      title: 'FOR WOMEN',
      image: '/images/categories/for-women.jpg',
      link: '/for-women',
      description: 'Elegant & Feminine Scents'
    },
    {
      title: 'NICHE',
      image: '/images/categories/niche.jpg',
      link: '/niche',
      description: 'Exclusive Artisan Perfumes'
    }
  ];

  const features = [
    {
      icon: '✓',
      title: '100% Authentic',
      description: 'Products',
      details: 'Guaranteed genuine luxury fragrances'
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Above ₹5,000',
      details: 'Fast delivery across India'
    },
    {
      icon: '💯',
      title: '30-Day Returns',
      description: 'Easy Process',
      details: 'Hassle-free returns & refunds'
    },
    {
      icon: '🎁',
      title: 'Free Samples',
      description: 'Every Order',
      details: 'Try new fragrances with each purchase'
    }
  ];

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products.slice(0, 6));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddToCart = (product) => {
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      showToast(`Thank you for subscribing! Confirmation sent to ${email}`, 'success');
      setEmail('');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const styles = {
    section: {
      backgroundColor: '#0a0a0a',
      padding: isMobile ? '3rem 1rem' : '4rem 2rem',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      textAlign: 'center',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      letterSpacing: '0.1em',
      fontWeight: 'bold',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#ccc',
      textAlign: 'center',
      marginBottom: isMobile ? '2.5rem' : '3rem',
    },
    bannerWrapper: {
      width: '100%',
      backgroundColor: '#0a0a0a',
      padding: isMobile ? '1rem' : '2rem',
      display: 'flex',
      justifyContent: 'center',
    },
    heroContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '1400px',
      height: isMobile ? '50vh' : '65vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
    },
    slideContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      transition: 'transform 0.8s ease-in-out',
      transform: `translateX(-${currentSlide * 100}%)`,
    },
    slide: {
      minWidth: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
      zIndex: 1,
      borderRadius: '12px',
    },
    content: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      color: '#fff',
      padding: isMobile ? '0 1.5rem' : '0 2rem',
      maxWidth: isMobile ? '100%' : '800px',
    },
    heroTitle: {
      fontSize: isMobile ? '1.75rem' : '3rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: isMobile ? '0.5rem' : '0.75rem',
      letterSpacing: '0.15em',
      fontWeight: 'bold',
      textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
    },
    heroSubtitle: {
      fontSize: isMobile ? '0.9rem' : '1.25rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      fontWeight: 300,
      textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
    },
    buttonContainer: {
      display: 'flex',
      gap: isMobile ? '1rem' : '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    button: {
      padding: isMobile ? '0.65rem 1.25rem' : '0.875rem 2rem',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
    },
    primaryButton: {
      backgroundColor: '#FFD700',
      color: '#000',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#FFD700',
      border: '2px solid #FFD700',
    },
    dotsContainer: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 3,
    },
    dot: {
      width: isMobile ? '8px' : '12px',
      height: isMobile ? '8px' : '12px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeDot: {
      backgroundColor: '#FFD700',
      width: isMobile ? '12px' : '16px',
      height: isMobile ? '12px' : '16px',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    categoryCard: {
      position: 'relative',
      height: isMobile ? '300px' : '400px',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
    },
    categoryImage: {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    categoryOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '2rem',
    },
    categoryTitle: {
      fontSize: isMobile ? '1.5rem' : '1.75rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      letterSpacing: '0.15em',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    categoryDescription: {
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      color: '#fff',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    categoryButton: {
      padding: isMobile ? '0.65rem 1.5rem' : '0.75rem 2rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
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
      fontWeight: '600',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      marginBottom: '0.5rem',
    },
    stars: {
      fontSize: isMobile ? '0.75rem' : '0.8rem',
    },
    ratingText: {
      fontSize: isMobile ? '0.7rem' : '0.75rem',
      color: '#ccc',
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
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    featureCard: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
      border: '1px solid #2a2a2a',
    },
    featureIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      marginBottom: '1rem',
    },
    featureTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      color: '#FFD700',
      marginBottom: '0.25rem',
    },
    featureDescription: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#fff',
      marginBottom: '0.5rem',
      fontFamily: "'Cormorant Garamond', serif",
    },
    featureDetails: {
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      color: '#999',
    },
    footer: {
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid #2a2a2a',
      padding: isMobile ? '2rem 1rem 1rem' : '3rem 2rem 1.5rem',
    },
    footerTop: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '2rem' : '2.5rem',
      marginBottom: isMobile ? '2rem' : '3rem',
    },
    footerColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    footerTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      color: '#FFD700',
      marginBottom: isMobile ? '1rem' : '1.25rem',
      textTransform: 'uppercase',
    },
    footerLink: {
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      color: '#ccc',
      textDecoration: 'none',
      marginBottom: '0.75rem',
      cursor: 'pointer',
    },
    footerText: {
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      color: '#999',
      marginBottom: '0.5rem',
    },
    newsletterInput: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '0.9rem',
      marginBottom: '0.75rem',
      outline: 'none',
    },
    newsletterButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    socialIcon: {
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    footerBottom: {
      paddingTop: isMobile ? '1.5rem' : '2rem',
      borderTop: '1px solid #2a2a2a',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '1rem' : '0',
    },
    copyright: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: '#666',
      textAlign: isMobile ? 'center' : 'left',
    },
    footerBottomLinks: {
      display: 'flex',
      gap: isMobile ? '1rem' : '2rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    loading: {
      textAlign: 'center',
      color: '#FFD700',
      fontSize: '1.5rem',
      padding: '3rem',
    },
  };

  return (
    <div>
      {/* HERO BANNER */}
      <div style={styles.bannerWrapper}>
        <div style={styles.heroContainer}>
          <div style={styles.slideContainer}>
            {bannerImages.map((image, index) => (
              <div key={index} style={{ ...styles.slide, backgroundImage: `url(${image})` }} />
            ))}
          </div>
          <div style={styles.overlay}></div>
          <div style={styles.content}>
            <h1 style={styles.heroTitle}>DISCOVER YOUR SIGNATURE SCENT</h1>
            <p style={styles.heroSubtitle}>
              Exclusive Collection of Premium Fragrances from Luxury Brands
            </p>
            <div style={styles.buttonContainer}>
              <Link to="/for-men" style={{ ...styles.button, ...styles.primaryButton }}>
                SHOP FOR MEN
              </Link>
              <Link to="/for-women" style={{ ...styles.button, ...styles.secondaryButton }}>
                SHOP FOR WOMEN
              </Link>
            </div>
          </div>
          <div style={styles.dotsContainer}>
            {bannerImages.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                style={{ ...styles.dot, ...(currentSlide === index ? styles.activeDot : {}) }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>SHOP BY CATEGORY</h2>
          <p style={styles.sectionSubtitle}>
            Discover the perfect fragrance for every occasion
          </p>
          <div style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link key={index} to={category.link} style={{ textDecoration: 'none' }}>
                <div
                  style={styles.categoryCard}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ ...styles.categoryImage, backgroundImage: `url(${category.image})` }} />
                  <div style={styles.categoryOverlay}>
                    <h3 style={styles.categoryTitle}>{category.title}</h3>
                    <p style={styles.categoryDescription}>{category.description}</p>
                    <span style={styles.categoryButton}>SHOP NOW</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BEST SELLERS */}
      <div style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>BEST SELLERS</h2>
          <p style={styles.sectionSubtitle}>
            Our most loved fragrances by perfume enthusiasts
          </p>
          
          {loading ? (
            <div style={styles.loading}>Loading products...</div>
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
                      />
                    </div>
                    <div style={styles.productInfo}>
                      <div style={styles.productBrand}>{product.brand}</div>
                      <div style={styles.productName}>{product.name}</div>
                      <div style={styles.ratingContainer}>
                        <span style={styles.stars}>{renderStars(product.rating)}</span>
                        <span style={styles.ratingText}>({product.rating})</span>
                      </div>
                      <div style={styles.productPrice}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <button
                        style={styles.addToCartButton}
                        onClick={(e) => {
                          e.preventDefault();
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div style={{ ...styles.section, borderTop: '1px solid #2a2a2a' }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>WHY CHOOSE VELORE</h2>
          <p style={styles.sectionSubtitle}>
            Your trusted destination for authentic luxury fragrances
          </p>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 215, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
                }}
              >
                <span style={styles.featureIcon}>{feature.icon}</span>
                <div style={styles.featureTitle}>{feature.title}</div>
                <div style={styles.featureDescription}>{feature.description}</div>
                <div style={styles.featureDetails}>{feature.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerTop}>
            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Shop</div>
              <Link to="/for-men" style={styles.footerLink}>For Men</Link>
              <Link to="/for-women" style={styles.footerLink}>For Women</Link>
              <Link to="/niche" style={styles.footerLink}>Niche Fragrances</Link>
            </div>

            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Help</div>
              <a style={styles.footerLink}>Contact Us</a>
              <a style={styles.footerLink}>FAQs</a>
              <a style={styles.footerLink}>Shipping Info</a>
              <a style={styles.footerLink}>Returns</a>
            </div>

            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>About</div>
              <a style={styles.footerLink}>About VELORE</a>
              <a style={styles.footerLink}>Our Story</a>
              <a style={styles.footerLink}>Careers</a>
              <a style={styles.footerLink}>Blog</a>
            </div>

            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Stay Connected</div>
              <div style={styles.footerText}>
                Subscribe for exclusive offers
              </div>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.newsletterInput}
                />
                <button
                  type="submit"
                  style={styles.newsletterButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                >
                  SUBSCRIBE
                </button>
              </form>
              <div style={styles.socialIcons}>
                <a style={styles.socialIcon}>📘</a>
                <a style={styles.socialIcon}>📷</a>
                <a style={styles.socialIcon}>🐦</a>
              </div>
              <div style={{ ...styles.footerText, marginTop: '1rem' }}>
                📧 irshadbabbu035@gmail.com
              </div>
              <div style={styles.footerText}>
                📞 +91 98458 82618
              </div>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={styles.copyright}>
              © 2025 VELORE. All Rights Reserved.
            </div>
            <div style={styles.footerBottomLinks}>
              <a style={styles.footerLink}>Privacy Policy</a>
              <a style={styles.footerLink}>Terms</a>
              <a style={styles.footerLink}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
