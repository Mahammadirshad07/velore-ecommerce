import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });
  const [chartData, setChartData] = useState({
    revenue: [],
    orderStatus: [],
    topProducts: [],
    categoryStats: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('http://localhost:5000/products'),
        fetch('http://localhost:5000/orders')
      ]);
      
      const products = await productsRes.json();
      const orders = await ordersRes.json();
      
      const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
        totalCustomers: 50
      });

      // Prepare chart data
      prepareChartData(orders, products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const prepareChartData = (orders, products) => {
    // 1. Revenue Chart Data (Last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    });

    const revenueData = last7Days.map(day => ({
      day,
      revenue: Math.floor(Math.random() * 15000) + 5000 // Simulated data
    }));

    // 2. Order Status Distribution
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const orderStatusData = Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));

    // 3. Top Selling Products (based on stock sold - simulated)
    const topProducts = products
      .sort((a, b) => (100 - b.stock) - (100 - a.stock))
      .slice(0, 5)
      .map(p => ({
        name: p.name.substring(0, 15),
        sold: 100 - p.stock
      }));

    // 4. Sales by Category
    const categoryCounts = products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categoryData = Object.entries(categoryCounts).map(([category, count]) => ({
      name: category === 'for-men' ? 'Men' : category === 'for-women' ? 'Women' : 'Niche',
      value: count
    }));

    setChartData({
      revenue: revenueData,
      orderStatus: orderStatusData.length > 0 ? orderStatusData : [{ name: 'No Orders', value: 1 }],
      topProducts: topProducts,
      categoryStats: categoryData
    });
  };

  const COLORS = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  return (
    <AdminLayout>
      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h1 style={styles.title}>Dashboard Overview</h1>
          <button onClick={fetchStats} style={styles.refreshBtn}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div style={styles.loadingText}>Loading stats...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>📦</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statLabel}>Total Products</h3>
                  <p style={styles.statNumber}>{stats.totalProducts}</p>
                </div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🛒</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statLabel}>Total Orders</h3>
                  <p style={styles.statNumber}>{stats.totalOrders}</p>
                </div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statIcon}>💰</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statLabel}>Revenue</h3>
                  <p style={styles.statNumber}>₹{stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statIcon}>👥</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statLabel}>Customers</h3>
                  <p style={styles.statNumber}>{stats.totalCustomers}</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div style={styles.chartsContainer}>
              {/* Revenue Chart */}
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>📈 Revenue Trend (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#FFD700" />
                    <YAxis stroke="#FFD700" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700' }}
                      labelStyle={{ color: '#FFD700' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#FFD700" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Order Status Distribution */}
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>🍩 Order Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.orderStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.orderStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Selling Products */}
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>📊 Top Selling Products</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.topProducts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#FFD700" />
                    <YAxis stroke="#FFD700" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700' }}
                      labelStyle={{ color: '#FFD700' }}
                    />
                    <Legend />
                    <Bar dataKey="sold" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Sales by Category */}
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>🎯 Sales by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.categoryStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Navigation Cards */}
            <div style={styles.navCards}>
              <div style={styles.navCard} onClick={() => navigate('/admin/products')}>
                <h3>📦 Manage Products</h3>
                <p>Add, edit, or delete products</p>
              </div>
              
              <div style={styles.navCard} onClick={() => navigate('/admin/orders')}>
                <h3>🛒 Manage Orders</h3>
                <p>View and update order status</p>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  headerSection: {
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
  refreshBtn: {
    padding: '0.8rem 1.5rem',
    background: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  loadingText: {
    textAlign: 'center',
    color: '#FFD700',
    fontSize: '1.2rem',
    padding: '3rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  statCard: {
    background: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
  },
  statIcon: {
    fontSize: '3rem',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    color: '#aaa',
    fontSize: '0.9rem',
    fontWeight: 500,
    margin: '0 0 0.5rem 0',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#FFD700',
    margin: 0,
  },
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  chartCard: {
    background: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  chartTitle: {
    color: '#FFD700',
    fontSize: '1.2rem',
    marginBottom: '1rem',
    fontFamily: "'Cormorant Garamond', serif",
  },
  navCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  navCard: {
    background: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '12px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Dashboard;
