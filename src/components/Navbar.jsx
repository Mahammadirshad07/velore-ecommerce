import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);


  const { getWishlistCount } = useWishlist();
  const { getCartCount } = useCart();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    navbar: {
      backgroundColor: '#000',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid #333',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '1rem 1rem' : '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brandName: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontFamily: 'serif',
      color: '#FFD700',
      letterSpacing: isMobile ? '0.2em' : '0.3em',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    navMenu: {
      display: isMobile ? 'none' : 'flex',
      listStyle: 'none',
      gap: '2.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      letterSpacing: '0.1em',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    navIcons: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '1.5rem',
    },
    iconLink: {
      color: '#fff',
      position: 'relative',
      cursor: 'pointer',
      transition: 'color 0.3s',
    },
    badge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#FFD700',
      color: '#000',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobileIcons: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      gap: '1rem',
    },
    menuToggle: {
      background: 'none',
      border: 'none',
      color: '#FFD700',
      cursor: 'pointer',
      padding: 0,
    },
    mobileMenu: {
      display: isMenuOpen ? 'block' : 'none',
      borderTop: '1px solid #333',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      paddingBottom: '1rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
       
        <Link to="/" style={styles.brandName}>
          VELORE
        </Link>

       
        <ul style={styles.navMenu}>
          <li><Link to="/" style={styles.navLink}>HOME</Link></li>
          {/* <li><Link to="/brand" style={styles.navLink}>BRAND</Link></li> */}
          <li><Link to="/for-men" style={styles.navLink}>FOR MEN</Link></li>
          <li><Link to="/for-women" style={styles.navLink}>FOR WOMEN</Link></li>
          <li><Link to="/niche" style={styles.navLink}>NICHE</Link></li>
        </ul>

       
        <div style={styles.navIcons}>
          {/* Search */}
          <Link to="/search" style={styles.iconLink} title="Search">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {/* Account */}
          <Link to="/account" style={styles.iconLink} title="Account">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" style={styles.iconLink} title="Wishlist">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" style={styles.iconLink} title="Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
        </div>

        {/* Mobile Icons (Cart + Hamburger) */}
        <div style={styles.mobileIcons}>
          <Link to="/cart" style={styles.iconLink} title="Cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            style={styles.menuToggle}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={styles.mobileMenu}>
          <ul style={{listStyle: 'none', textAlign: 'center', padding: 0, margin: 0}}>
            <li style={{marginBottom: '1.25rem'}}>
              <Link 
                to="/" 
                style={{color: '#fff', textDecoration: 'none', fontSize: '1.125rem'}} 
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li style={{marginBottom: '1.25rem'}}>
              
            </li>
            <li style={{marginBottom: '1.25rem'}}>
              <Link 
                to="/for-men" 
                style={{color: '#fff', textDecoration: 'none', fontSize: '1.125rem'}} 
                onClick={() => setIsMenuOpen(false)}
              >
                FOR MEN
              </Link>
            </li>
            <li style={{marginBottom: '1.25rem'}}>
              <Link 
                to="/for-women" 
                style={{color: '#fff', textDecoration: 'none', fontSize: '1.125rem'}} 
                onClick={() => setIsMenuOpen(false)}
              >
                FOR WOMEN
              </Link>
            </li>
            <li style={{marginBottom: '1.25rem'}}>
              <Link 
                to="/niche" 
                style={{color: '#fff', textDecoration: 'none', fontSize: '1.125rem'}} 
                onClick={() => setIsMenuOpen(false)}
              >
                NICHE
              </Link>
            </li>
          </ul>

          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '1.5rem', 
            paddingTop: '1.5rem', 
            borderTop: '1px solid #333'
          }}>
            <Link 
              to="/search" 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                color: '#fff', 
                textDecoration: 'none'
              }} 
              onClick={() => setIsMenuOpen(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span style={{fontSize: '0.75rem', marginTop: '4px'}}>SEARCH</span>
            </Link>

            <Link 
              to="/account" 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                color: '#fff', 
                textDecoration: 'none'
              }} 
              onClick={() => setIsMenuOpen(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span style={{fontSize: '0.75rem', marginTop: '4px'}}>ACCOUNT</span>
            </Link>

            <Link 
              to="/wishlist" 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                color: '#fff', 
                textDecoration: 'none', 
                position: 'relative'
              }} 
              onClick={() => setIsMenuOpen(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && <span style={{...styles.badge, top: '-4px', right: '-4px'}}>{wishlistCount}</span>}
              <span style={{fontSize: '0.75rem', marginTop: '4px'}}>WISHLIST</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
