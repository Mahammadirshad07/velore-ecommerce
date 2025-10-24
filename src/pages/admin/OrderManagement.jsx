import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [orders, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
      alert(`Order status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'processing':
        return '#2196F3';
      case 'shipped':
        return '#9C27B0';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#ff4444';
      default:
        return '#aaa';
    }
  };

  const getOrderCount = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Order Management</h1>
          <div style={styles.orderStats}>
            <span style={styles.statBadge}>
              Total Orders: <strong>{orders.length}</strong>
            </span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div style={styles.filterTabs}>
          <button
            onClick={() => setStatusFilter('all')}
            style={{
              ...styles.filterTab,
              ...(statusFilter === 'all' ? styles.activeTab : {}),
            }}
          >
            All ({getOrderCount('all')})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            style={{
              ...styles.filterTab,
              ...(statusFilter === 'pending' ? styles.activeTab : {}),
            }}
          >
            Pending ({getOrderCount('pending')})
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            style={{
              ...styles.filterTab,
              ...(statusFilter === 'processing' ? styles.activeTab : {}),
            }}
          >
            Processing ({getOrderCount('processing')})
          </button>
          <button
            onClick={() => setStatusFilter('shipped')}
            style={{
              ...styles.filterTab,
              ...(statusFilter === 'shipped' ? styles.activeTab : {}),
            }}
          >
            Shipped ({getOrderCount('shipped')})
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            style={{
              ...styles.filterTab,
              ...(statusFilter === 'delivered' ? styles.activeTab : {}),
            }}
          >
            Delivered ({getOrderCount('delivered')})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            style={{
              ...styles.filterTab,
              ...(statusFilter === 'cancelled' ? styles.activeTab : {}),
            }}
          >
            Cancelled ({getOrderCount('cancelled')})
          </button>
        </div>

        {/* Orders Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Items</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#aaa' }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} style={styles.tableRow}>
                    <td style={styles.td}>#{order.id}</td>
                    <td style={styles.td}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{order.email}</div>
                      </div>
                    </td>
                    <td style={styles.td}>{order.date}</td>
                    <td style={styles.td}>{order.items?.length || 0} items</td>
                    <td style={styles.td}>
                      <strong>₹{order.total?.toFixed(2)}</strong>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          background: getStatusColor(order.status),
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => viewOrderDetails(order)}
                        style={styles.viewBtn}
                      >
                        👁️ View
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={styles.statusSelect}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Order Details - #{selectedOrder.id}</h2>
                <button onClick={() => setShowModal(false)} style={styles.closeBtn}>
                  ✕
                </button>
              </div>

              <div style={styles.modalBody}>
                {/* Customer Info */}
                <div style={styles.infoSection}>
                  <h3 style={styles.sectionTitle}>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedOrder.address || 'N/A'}</p>
                </div>

                {/* Order Info */}
                <div style={styles.infoSection}>
                  <h3 style={styles.sectionTitle}>Order Information</h3>
                  <p><strong>Order Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Status:</strong> 
                    <span style={{
                      ...styles.statusBadge,
                      background: getStatusColor(selectedOrder.status),
                      marginLeft: '0.5rem'
                    }}>
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p><strong>Total Amount:</strong> ₹{selectedOrder.total?.toFixed(2)}</p>
                </div>

                {/* Order Items */}
                <div style={styles.infoSection}>
                  <h3 style={styles.sectionTitle}>Order Items</h3>
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} style={styles.orderItem}>
                      <img src={item.image} alt={item.name} style={styles.itemImage} />
                      <div style={styles.itemInfo}>
                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#aaa' }}>
                          Qty: {item.quantity} × ₹{item.price}
                        </div>
                      </div>
                      <div style={styles.itemTotal}>
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.5rem',
    color: '#FFD700',
    margin: 0,
  },
  orderStats: {
    display: 'flex',
    gap: '1rem',
  },
  statBadge: {
    padding: '0.6rem 1.2rem',
    background: '#1a1a1a',
    border: '2px solid #FFD700',
    borderRadius: '20px',
    color: '#FFD700',
    fontSize: '0.95rem',
  },
  filterTabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterTab: {
    padding: '0.7rem 1.2rem',
    background: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    background: '#FFD700',
    color: '#000',
    borderColor: '#FFD700',
    fontWeight: 'bold',
  },
  tableContainer: {
    background: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    background: '#0a0a0a',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    color: '#FFD700',
    fontWeight: 600,
    borderBottom: '2px solid #333',
  },
  tableRow: {
    borderBottom: '1px solid #333',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #333',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '0.4rem 0.9rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#fff',
    textTransform: 'capitalize',
  },
  viewBtn: {
    padding: '0.5rem 0.8rem',
    background: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    fontSize: '0.85rem',
  },
  statusSelect: {
    padding: '0.5rem',
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
  },
  modalContent: {
    background: '#1a1a1a',
    border: '2px solid #FFD700',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '2px solid #333',
  },
  modalTitle: {
    color: '#FFD700',
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
  },
  closeBtn: {
    background: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: '1.5rem',
  },
  infoSection: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: '1.2rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #333',
    paddingBottom: '0.5rem',
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#0a0a0a',
    borderRadius: '8px',
    marginBottom: '0.8rem',
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  itemInfo: {
    flex: 1,
  },
  itemTotal: {
    fontWeight: 'bold',
    color: '#FFD700',
    fontSize: '1.1rem',
  },
};

export default OrderManagement;
