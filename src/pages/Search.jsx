import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Search() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortBy, setSortBy] = useState('popularity');

  const { addToCart } = useCart();

  // Fetch all products
  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setAllProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    let results = [...allProducts];

    // 1. Search filter (by name or brand)
    if (searchQuery) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Category filter
    if (selectedCategory !== 'all') {
      results = results.filter(product => product.category === selectedCategory);
    }

    // 3. Price range filter
    results = results.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // 4. Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        results.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, priceRange, sortBy, allProducts]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert(`✅ Added ${product.brand} ${product.name} to cart!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return '⭐'.repeat(fullStars);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 25000]);
    setSortBy('popularity');
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
    layout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
      gap: '2rem',
    },
    sidebar: {
      backgroundColor: '#1a1a1a',
      padding: '1.5rem',
      borderRadius: '8px',
      height: 'fit-content',
      position: 'sticky',
      top: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    filterSection: {
      marginBottom: '1.5rem',
    },
    filterTitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#FFD700',
      marginBottom: '0.75rem',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
    priceRange: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      width: '100%',
    },
    priceInputs: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
    },
    priceInput: {
      padding: '0.6rem 0.4rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '0.85rem',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      minWidth: 0,
    },
    priceDisplay: {
      color: '#ccc',
      fontSize: '0.8rem',
      textAlign: 'center',
      marginTop: '0.25rem',
    },
    clearButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: 'transparent',
      border: '2px solid #FFD700',
      borderRadius: '6px',
      color: '#FFD700',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '0.5rem',
      boxSizing: 'border-box',
    },
    mainContent: {
      minHeight: '400px',
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    resultsCount: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#ccc',
    },
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    sortLabel: {
      fontSize: '0.9rem',
      color: '#ccc',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    productCard: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
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
    noResults: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#ccc',
    },
    noResultsTitle: {
      fontSize: '1.5rem',
      color: '#FFD700',
      marginBottom: '1rem',
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
        <div style={styles.loading}>Loading products...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>SEARCH & DISCOVER</h1>
          <p style={styles.subtitle}>Find your perfect fragrance</p>
        </div>

        <div style={styles.layout}>
          {/* Sidebar - Filters */}
          <aside style={styles.sidebar}>
            {/* Search */}
            <div style={styles.filterSection}>
              <div style={styles.filterTitle}>🔍 Search</div>
              <input
                type="text"
                placeholder="Search by name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Category Filter */}
            <div style={styles.filterSection}>
              <div style={styles.filterTitle}>📂 Category</div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={styles.select}
              >
                <option value="all">All Categories</option>
                <option value="men">For Men</option>
                <option value="women">For Women</option>
                <option value="unisex">Niche/Unisex</option>
              </select>
            </div>

            {/* Price Range */}
            <div style={styles.filterSection}>
              <div style={styles.filterTitle}>💰 Price Range</div>
              <div style={styles.priceRange}>
                <div style={styles.priceInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    style={styles.priceInput}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    style={styles.priceInput}
                  />
                </div>
                <div style={styles.priceDisplay}>
                  ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              style={styles.clearButton}
              onClick={handleClearFilters}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFD700';
              }}
            >
              CLEAR ALL FILTERS
            </button>
          </aside>

          {/* Main Content - Products */}
          <main style={styles.mainContent}>
            {/* Results Header */}
            <div style={styles.resultsHeader}>
              <div style={styles.resultsCount}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </div>
              <div style={styles.sortContainer}>
                <span style={styles.sortLabel}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ ...styles.select, width: 'auto', minWidth: '180px' }}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div style={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={styles.productCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
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
            ) : (
              <div style={styles.noResults}>
                <div style={styles.noResultsTitle}>No Products Found</div>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Search;
