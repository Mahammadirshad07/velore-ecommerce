import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderPlaced]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newOrderNumber = 'VEL' + Date.now();
      setOrderNumber(newOrderNumber);
      
      const orderData = {
        orderNumber: newOrderNumber,
        items: cartItems,
        shippingAddress: formData,
        total: getCartTotal() + (getCartTotal() >= 5000 ? 0 : 100),
        orderDate: new Date().toISOString(),
        status: 'Processing'
      };
      
      try {
        
        const response = await fetch('http://localhost:5000/orders', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          console.log('✅ Order saved to db.json successfully!');
          
          
          localStorage.setItem('lastOrder', JSON.stringify(orderData));
          
          
          const existingHistory = localStorage.getItem('orderHistory');
          const orderHistory = existingHistory ? JSON.parse(existingHistory) : [];
          orderHistory.push(orderData);
          localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
          
          clearCart();
          setOrderPlaced(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          throw new Error('Failed to save order');
        }
      } catch (error) {
        console.error('⚠️ Error saving order to json-server:', error);
        console.log('📝 Saving to localStorage as fallback...');
        
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        const existingHistory = localStorage.getItem('orderHistory');
        const orderHistory = existingHistory ? JSON.parse(existingHistory) : [];
        orderHistory.push(orderData);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        
        clearCart();
        setOrderPlaced(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        
        console.warn('Note: Order saved to localStorage. json-server may not be running on port 3001.');
      }
    }
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 5000 ? 0 : 100;
  const total = subtotal + shippingCost;

  const styles = {
    container: {
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      padding: isMobile ? '1.5rem 1rem' : '2rem 2rem',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    title: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '0.3rem',
    },
    subtitle: {
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      color: '#ccc',
    },
    // Success Message Styles
    successContainer: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
      border: '2px solid #4caf50',
      textAlign: 'center',
      maxWidth: '500px',
      margin: '0 auto',
    },
    successIcon: {
      width: isMobile ? '60px' : '70px',
      height: isMobile ? '60px' : '70px',
      borderRadius: '50%',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      border: '3px solid #4caf50',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      fontSize: isMobile ? '2rem' : '2.5rem',
      animation: 'scaleIn 0.5s ease-out',
    },
    successTitle: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#4caf50',
      marginBottom: '0.75rem',
    },
    successMessage: {
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      color: '#ccc',
      marginBottom: '1rem',
      lineHeight: '1.5',
    },
    orderNumberBox: {
      backgroundColor: '#0a0a0a',
      padding: '1rem',
      borderRadius: '6px',
      border: '1px solid #2a2a2a',
      marginBottom: '1rem',
    },
    orderNumberLabel: {
      fontSize: '0.8rem',
      color: '#999',
      marginBottom: '0.4rem',
    },
    orderNumberValue: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '0.75rem',
      marginTop: '1.5rem',
    },
    button: {
      flex: 1,
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
      textAlign: 'center',
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
    
    layout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
      gap: '1.5rem',
    },
    formSection: {
      backgroundColor: '#1a1a1a',
      padding: isMobile ? '1.2rem' : '1.5rem',
      borderRadius: '8px',
      border: '1px solid #2a2a2a',
    },
    sectionTitle: {
      fontSize: isMobile ? '1.2rem' : '1.3rem',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#FFD700',
      marginBottom: '1rem',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '0.75rem',
      marginBottom: '0.75rem',
    },
    formGroup: {
      marginBottom: '0.75rem',
    },
    label: {
      display: 'block',
      fontSize: '0.85rem',
      color: '#ccc',
      marginBottom: '0.4rem',
    },
    input: {
      width: '100%',
      padding: '0.65rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
    },
    inputError: {
      borderColor: '#ff4444',
    },
    error: {
      color: '#ff4444',
      fontSize: '0.75rem',
      marginTop: '0.2rem',
    },
    textarea: {
      width: '100%',
      padding: '0.65rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      minHeight: '70px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    paymentOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    paymentOption: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#0a0a0a',
      border: '2px solid #333',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    paymentOptionSelected: {
      borderColor: '#FFD700',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
    },
    radio: {
      marginRight: '0.75rem',
      accentColor: '#FFD700',
    },
    paymentLabel: {
      fontSize: '0.9rem',
      color: '#fff',
    },
    summarySection: {
      backgroundColor: '#1a1a1a',
      padding: isMobile ? '1.2rem' : '1.5rem',
      borderRadius: '8px',
      border: '1px solid #2a2a2a',
      height: 'fit-content',
    },
    orderItem: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '0.75rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #2a2a2a',
    },
    itemImage: {
      width: '50px',
      height: '50px',
      borderRadius: '6px',
      objectFit: 'cover',
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: '0.85rem',
      color: '#fff',
      marginBottom: '0.2rem',
    },
    itemBrand: {
      fontSize: '0.7rem',
      color: '#FFD700',
      marginBottom: '0.2rem',
      textTransform: 'uppercase',
    },
    itemQuantity: {
      fontSize: '0.75rem',
      color: '#999',
    },
    itemPrice: {
      fontSize: '0.9rem',
      color: '#FFD700',
      fontWeight: 'bold',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.6rem',
      fontSize: '0.9rem',
    },
    summaryLabel: {
      color: '#ccc',
    },
    summaryValue: {
      color: '#fff',
      fontWeight: '500',
    },
    divider: {
      height: '1px',
      backgroundColor: '#2a2a2a',
      margin: '0.75rem 0',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginTop: '0.75rem',
    },
    totalLabel: {
      color: '#FFD700',
      fontFamily: "'Cormorant Garamond', serif",
    },
    totalValue: {
      color: '#FFD700',
      fontFamily: "'Cormorant Garamond', serif",
    },
    submitButton: {
      width: '100%',
      padding: '0.85rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      letterSpacing: '0.05em',
    },
    freeShipping: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      border: '1px solid rgba(76, 175, 80, 0.3)',
      padding: '0.6rem',
      borderRadius: '6px',
      marginBottom: '0.75rem',
      textAlign: 'center',
      color: '#4caf50',
      fontSize: '0.85rem',
    },
  };

 
  if (orderPlaced) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>✓</div>
            <h1 style={styles.successTitle}>ORDER COMPLETED SUCCESSFULLY!</h1>
            <p style={styles.successMessage}>
              Thank you for placing your order with VELORE.<br />
              We appreciate your business and will process your order shortly.
            </p>
            
            <div style={styles.orderNumberBox}>
              <div style={styles.orderNumberLabel}>Your Order Number</div>
              <div style={styles.orderNumberValue}>{orderNumber}</div>
            </div>

            <p style={styles.successMessage}>
              You will receive a confirmation email shortly with your order details.
            </p>

            <div style={styles.buttonContainer}>
              <Link
                to="/orders"
                style={{...styles.button, ...styles.primaryButton}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
              >
                📦 VIEW ORDERS
              </Link>
              <Link
                to="/"
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
                🏠 BACK TO HOME
              </Link>
            </div>
          </div>
        </div>

        <style>
          {`
            @keyframes scaleIn {
              from {
                transform: scale(0);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    );
  }

 
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>CHECKOUT</h1>
          <p style={styles.subtitle}>Complete your order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.layout}>
            {/* Left Side - Form */}
            <div>
              {/* Shipping Information */}
              <div style={styles.formSection}>
                <h2 style={styles.sectionTitle}>Shipping Information</h2>
                
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.firstName ? styles.inputError : {}),
                      }}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <div style={styles.error}>{errors.firstName}</div>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.lastName ? styles.inputError : {}),
                      }}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <div style={styles.error}>{errors.lastName}</div>}
                  </div>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.email ? styles.inputError : {}),
                      }}
                      placeholder="your@email.com"
                    />
                    {errors.email && <div style={styles.error}>{errors.email}</div>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.phone ? styles.inputError : {}),
                      }}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                    />
                    {errors.phone && <div style={styles.error}>{errors.phone}</div>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      ...styles.textarea,
                      ...(errors.address ? styles.inputError : {}),
                    }}
                    placeholder="Street address, apartment, suite, etc."
                  />
                  {errors.address && <div style={styles.error}>{errors.address}</div>}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.city ? styles.inputError : {}),
                      }}
                      placeholder="City"
                    />
                    {errors.city && <div style={styles.error}>{errors.city}</div>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.state ? styles.inputError : {}),
                      }}
                      placeholder="State"
                    />
                    {errors.state && <div style={styles.error}>{errors.state}</div>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.pincode ? styles.inputError : {}),
                    }}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                  {errors.pincode && <div style={styles.error}>{errors.pincode}</div>}
                </div>
              </div>

            
              <div style={{ ...styles.formSection, marginTop: '1.5rem' }}>
                <h2 style={styles.sectionTitle}>Payment Method</h2>
                <div style={styles.paymentOptions}>
                  <label
                    style={{
                      ...styles.paymentOption,
                      ...(formData.paymentMethod === 'cod' ? styles.paymentOptionSelected : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      style={styles.radio}
                    />
                    <span style={styles.paymentLabel}>💵 Cash on Delivery</span>
                  </label>

                  <label
                    style={{
                      ...styles.paymentOption,
                      ...(formData.paymentMethod === 'card' ? styles.paymentOptionSelected : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      style={styles.radio}
                    />
                    <span style={styles.paymentLabel}>💳 Credit/Debit Card (Coming Soon)</span>
                  </label>

                  <label
                    style={{
                      ...styles.paymentOption,
                      ...(formData.paymentMethod === 'upi' ? styles.paymentOptionSelected : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      style={styles.radio}
                    />
                    <span style={styles.paymentLabel}>📱 UPI (Coming Soon)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div>
              <div style={styles.summarySection}>
                <h2 style={styles.sectionTitle}>Order Summary</h2>

                {subtotal >= 5000 && (
                  <div style={styles.freeShipping}>
                    🎉 Free Shipping Applied!
                  </div>
                )}

                {/* Order Items */}
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.orderItem}>
                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                    <div style={styles.itemDetails}>
                      <div style={styles.itemBrand}>{item.brand}</div>
                      <div style={styles.itemName}>{item.name}</div>
                      <div style={styles.itemQuantity}>Qty: {item.quantity}</div>
                    </div>
                    <div style={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}

                <div style={styles.divider}></div>

                {/* Price Breakdown */}
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Subtotal</span>
                  <span style={styles.summaryValue}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Shipping</span>
                  <span style={styles.summaryValue}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalValue}>₹{total.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
