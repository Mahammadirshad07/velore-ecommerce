import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Orders() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  
    const allOrders = [];
    
  
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      allOrders.push(JSON.parse(lastOrder));
    }

    const historicalOrders = localStorage.getItem('orderHistory');
    if (historicalOrders) {
      const parsed = JSON.parse(historicalOrders);
      allOrders.push(...parsed);
    }

    
    allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    setOrders(allOrders);
  }, []);

  const getStatusColor = (status = 'Processing') => {
    switch (status) {
      case 'Delivered':
        return '#4caf50';
      case 'Shipped':
        return '#2196f3';
      case 'Processing':
        return '#ff9800';
      case 'Cancelled':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const getStatusIcon = (status = 'Processing') => {
    switch (status) {
      case 'Delivered':
        return '✓';
      case 'Shipped':
        return '🚚';
      case 'Processing':
        return '⏳';
      case 'Cancelled':
        return '✕';
      default:
        return '⏳';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      border: '1px solid #2a2a2a',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    emptyTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '0.5rem',
    },
    emptyText: {
      fontSize: '0.95rem',
      color: '#999',
      marginBottom: '2rem',
    },
    shopButton: {
      display: 'inline-block',
      padding: '0.9rem 2rem',
      backgroundColor: '#FFD700',
      color: '#000',
      textDecoration: 'none',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    },
    ordersGrid: {
      display: 'grid',
      gap: '1.5rem',
    },
    orderCard: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: isMobile ? '1.2rem' : '1.5rem',
      transition: 'all 0.3s ease',
    },
    orderHeader: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #2a2a2a',
      gap: isMobile ? '0.5rem' : '0',
    },
    orderNumber: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      fontWeight: 'bold',
    },
    orderDate: {
      fontSize: '0.85rem',
      color: '#999',
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.4rem 0.9rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 'bold',
    },
    orderItems: {
      marginBottom: '1rem',
    },
    orderItem: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(42, 42, 42, 0.5)',
    },
    itemImage: {
      width: isMobile ? '60px' : '70px',
      height: isMobile ? '60px' : '70px',
      borderRadius: '6px',
      objectFit: 'cover',
    },
    itemDetails: {
      flex: 1,
    },
    itemBrand: {
      fontSize: '0.75rem',
      color: '#FFD700',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '0.2rem',
    },
    itemName: {
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      color: '#fff',
      marginBottom: '0.3rem',
    },
    itemQuantity: {
      fontSize: '0.8rem',
      color: '#999',
    },
    itemPrice: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: '#FFD700',
      fontWeight: 'bold',
    },
    orderFooter: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #2a2a2a',
      gap: isMobile ? '1rem' : '0',
    },
    totalSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem',
    },
    totalLabel: {
      fontSize: '0.85rem',
      color: '#999',
    },
    totalAmount: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      fontWeight: 'bold',
    },
    actionButtons: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
    },
    button: {
      padding: isMobile ? '0.6rem 1rem' : '0.7rem 1.3rem',
      borderRadius: '6px',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      border: 'none',
    },
    primaryButton: {
      backgroundColor: '#FFD700',
      color: '#000',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      border: '2px solid #FFD700',
      color: '#FFD700',
    },
    addressSection: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#0a0a0a',
      borderRadius: '6px',
      border: '1px solid #2a2a2a',
    },
    addressTitle: {
      fontSize: '0.85rem',
      color: '#FFD700',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    addressText: {
      fontSize: '0.85rem',
      color: '#ccc',
      lineHeight: '1.6',
    },
  };

 
  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>MY ORDERS</h1>
            <p style={styles.subtitle}>Track and manage your perfume orders</p>
          </div>

          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <h2 style={styles.emptyTitle}>No Orders Yet</h2>
            <p style={styles.emptyText}>
              You haven't placed any orders yet. Start shopping for your favorite perfumes!
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
          <h1 style={styles.title}>MY ORDERS</h1>
          <p style={styles.subtitle}>Track and manage your perfume orders</p>
        </div>

        <div style={styles.ordersGrid}>
          {orders.map((order) => (
            <div key={order.orderNumber} style={styles.orderCard}>
              {/* Order Header */}
              <div style={styles.orderHeader}>
                <div>
                  <div style={styles.orderNumber}>Order #{order.orderNumber}</div>
                  <div style={styles.orderDate}>
                    Placed on {formatDate(order.orderDate)}
                  </div>
                </div>
                <div
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status),
                    border: `1px solid ${getStatusColor(order.status)}`,
                  }}
                >
                  <span>{getStatusIcon(order.status)}</span>
                  <span>{order.status || 'Processing'}</span>
                </div>
              </div>

             
              <div style={styles.orderItems}>
                {order.items.map((item) => (
                  <div key={item.id} style={styles.orderItem}>
                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                    <div style={styles.itemDetails}>
                      <div style={styles.itemBrand}>{item.brand}</div>
                      <div style={styles.itemName}>{item.name}</div>
                      <div style={styles.itemQuantity}>Quantity: {item.quantity}</div>
                    </div>
                    <div style={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

             
              <div style={styles.addressSection}>
                <div style={styles.addressTitle}>🏠 SHIPPING ADDRESS</div>
                <div style={styles.addressText}>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                  📞 {order.shippingAddress.phone}
                </div>
              </div>

              
              <div style={styles.orderFooter}>
                <div style={styles.totalSection}>
                  <div style={styles.totalLabel}>Total Amount</div>
                  <div style={styles.totalAmount}>
                    ₹{order.total.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={styles.actionButtons}>
                  <Link
                    to="/"
                    style={{...styles.button, ...styles.primaryButton}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                  >
                    SHOP AGAIN
                  </Link>
                  <Link
                    to={`/order/${order.orderNumber}`}
                    style={{...styles.button, ...styles.secondaryButton}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFD700';
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#FFD700';
                    }}
                  >
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
