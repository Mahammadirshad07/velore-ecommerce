import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function OrderDetails() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [order, setOrder] = useState(null);
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      const parsedOrder = JSON.parse(lastOrder);
      if (parsedOrder.orderNumber === orderNumber) {
        setOrder(parsedOrder);
        return;
      }
    }

   
    const orderHistory = localStorage.getItem('orderHistory');
    if (orderHistory) {
      const orders = JSON.parse(orderHistory);
      const foundOrder = orders.find(o => o.orderNumber === orderNumber);
      if (foundOrder) {
        setOrder(foundOrder);
        return;
      }
    }

    
    navigate('/orders');
  }, [orderNumber, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const styles = {
    container: {
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      padding: isMobile ? '1.5rem 1rem' : '2rem',
    },
    content: {
      maxWidth: '1000px',
      margin: '0 auto',
    },
    backButton: {
      backgroundColor: 'transparent',
      border: '1px solid #FFD700',
      color: '#FFD700',
      padding: '0.6rem 1.2rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginBottom: '2rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
    },
    header: {
      backgroundColor: '#1a1a1a',
      border: '2px solid #FFD700',
      borderRadius: '8px',
      padding: isMobile ? '1.5rem' : '2rem',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    orderNumber: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    orderDate: {
      fontSize: '0.9rem',
      color: '#ccc',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.5rem 1.2rem',
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      border: '1px solid #FFD700',
      borderRadius: '20px',
      color: '#FFD700',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      marginTop: '1rem',
    },
    
    trackingSection: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: isMobile ? '1.5rem' : '2rem',
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    timeline: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      position: 'relative',
      padding: isMobile ? '1rem 0' : '2rem 0',
    },
    timelineStep: {
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: 'center',
      gap: isMobile ? '1rem' : '0.5rem',
      position: 'relative',
      flex: 1,
      zIndex: 1,
    },
    timelineIcon: {
      width: isMobile ? '50px' : '60px',
      height: isMobile ? '50px' : '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    },
    timelineLabel: {
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: isMobile ? '0' : '0.5rem',
    },
    timelineLine: {
      position: 'absolute',
      height: isMobile ? '100%' : '3px',
      width: isMobile ? '3px' : '100%',
      left: isMobile ? '25px' : '0',
      top: isMobile ? '0' : '30px',
      zIndex: 0,
    },
   
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '2rem',
      marginBottom: '2rem',
    },
    detailsCard: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: isMobile ? '1.2rem' : '1.5rem',
    },
    cardTitle: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      fontSize: '0.9rem',
    },
    infoLabel: {
      color: '#999',
    },
    infoValue: {
      color: '#fff',
      fontWeight: '500',
    },
    addressText: {
      color: '#ccc',
      lineHeight: '1.8',
      fontSize: '0.9rem',
    },
    divider: {
      height: '1px',
      backgroundColor: '#2a2a2a',
      margin: '1rem 0',
    },
   
    itemsCard: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: isMobile ? '1.2rem' : '1.5rem',
    },
    orderItem: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #2a2a2a',
    },
    itemImage: {
      width: isMobile ? '70px' : '80px',
      height: isMobile ? '70px' : '80px',
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
      marginBottom: '0.3rem',
    },
    itemName: {
      fontSize: '0.95rem',
      color: '#fff',
      marginBottom: '0.5rem',
    },
    itemMeta: {
      fontSize: '0.85rem',
      color: '#999',
    },
    itemPrice: {
      fontSize: '1rem',
      color: '#FFD700',
      fontWeight: 'bold',
    },
    totalSection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '2px solid #2a2a2a',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: 'bold',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    button: {
      padding: '0.9rem 2rem',
      borderRadius: '6px',
      fontSize: '0.95rem',
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
  };

  if (!order) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={{ textAlign: 'center', color: '#FFD700', padding: '3rem' }}>
            Loading order details...
          </div>
        </div>
      </div>
    );
  }

  const trackingSteps = [
    { label: 'Order Placed', icon: '✓', completed: true },
    { label: 'Processing', icon: '📦', completed: true },
    { label: 'Shipped', icon: '🚚', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { label: 'Out for Delivery', icon: '🚛', completed: order.status === 'Delivered' },
    { label: 'Delivered', icon: '🏠', completed: order.status === 'Delivered' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Link
          to="/orders"
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD700';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#FFD700';
          }}
        >
          ← Back to Orders
        </Link>

        
        <div style={styles.header}>
          <div style={styles.orderNumber}>ORDER #{order.orderNumber}</div>
          <div style={styles.orderDate}>Placed on {formatDate(order.orderDate)}</div>
          <div style={styles.statusBadge}>
            {order.status || 'Processing'} ⏳
          </div>
        </div>

        
        <div style={styles.trackingSection}>
          <h2 style={styles.sectionTitle}>📍 Order Tracking</h2>
          
          <div style={styles.timeline}>
            <div
              style={{
                ...styles.timelineLine,
                background: isMobile
                  ? `linear-gradient(to bottom, #FFD700 ${(trackingSteps.filter(s => s.completed).length / trackingSteps.length) * 100}%, #2a2a2a ${(trackingSteps.filter(s => s.completed).length / trackingSteps.length) * 100}%)`
                  : `linear-gradient(to right, #FFD700 ${(trackingSteps.filter(s => s.completed).length / trackingSteps.length) * 100}%, #2a2a2a ${(trackingSteps.filter(s => s.completed).length / trackingSteps.length) * 100}%)`,
              }}
            ></div>

            {trackingSteps.map((step, index) => (
              <div key={index} style={styles.timelineStep}>
                <div
                  style={{
                    ...styles.timelineIcon,
                    backgroundColor: step.completed ? '#FFD700' : '#2a2a2a',
                    color: step.completed ? '#000' : '#666',
                    border: step.completed ? '3px solid #FFD700' : '3px solid #2a2a2a',
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    ...styles.timelineLabel,
                    color: step.completed ? '#FFD700' : '#666',
                  }}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div style={styles.detailsGrid}>
         
          <div style={styles.detailsCard}>
            <h3 style={styles.cardTitle}>
              🏠 Shipping Address
            </h3>
            <div style={styles.addressText}>
              <strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong><br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state}<br />
              Pincode: {order.shippingAddress.pincode}<br /><br />
              📧 {order.shippingAddress.email}<br />
              📞 {order.shippingAddress.phone}
            </div>
          </div>

         
          <div style={styles.detailsCard}>
            <h3 style={styles.cardTitle}>
              💳 Payment & Delivery
            </h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Payment Method:</span>
              <span style={styles.infoValue}>
                {order.shippingAddress.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Payment Status:</span>
              <span style={{ ...styles.infoValue, color: '#4caf50' }}>
                {order.shippingAddress.paymentMethod === 'cod' ? 'Pending' : 'Paid'}
              </span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Estimated Delivery:</span>
              <span style={styles.infoValue}>3-5 Business Days</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Shipping Partner:</span>
              <span style={styles.infoValue}>VELORE Express</span>
            </div>
          </div>
        </div>

        
        <div style={styles.itemsCard}>
          <h3 style={styles.cardTitle}>
            🛍️ Order Items ({order.items.length})
          </h3>
          
          {order.items.map((item) => (
            <div key={item.id} style={styles.orderItem}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <div style={styles.itemBrand}>{item.brand}</div>
                <div style={styles.itemName}>{item.name}</div>
                <div style={styles.itemMeta}>
                  Quantity: {item.quantity} | Size: 100ml EDP
                </div>
              </div>
              <div style={styles.itemPrice}>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}

          <div style={styles.totalSection}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Subtotal:</span>
              <span style={styles.infoValue}>
                ₹{(order.total - (order.total >= 5000 ? 0 : 100)).toLocaleString('en-IN')}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Shipping:</span>
              <span style={styles.infoValue}>
                {order.total >= 5000 ? 'FREE' : '₹100'}
              </span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.totalRow}>
              <span>Total Amount:</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

     
        <div style={styles.actionButtons}>
          <Link
            to="/"
            style={{ ...styles.button, ...styles.primaryButton }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFA500')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFD700')}
          >
            🛒 CONTINUE SHOPPING
          </Link>
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFD700';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FFD700';
            }}
            onClick={() => window.print()}
          >
            🖨️ PRINT INVOICE
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
