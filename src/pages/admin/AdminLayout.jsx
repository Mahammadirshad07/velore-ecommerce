import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <h2 style={styles.logoText}>Velore Admin</h2>
          <p style={styles.logoSubtext}>Perfume Management</p>
        </div>

        <nav style={styles.nav}>
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {}),
            })}
          >
            <span style={styles.icon}>📊</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {}),
            })}
          >
            <span style={styles.icon}>📦</span>
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {}),
            })}
          >
            <span style={styles.icon}>🛒</span>
            Orders
          </NavLink>

          <NavLink
            to="/admin/brands"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {}),
            })}
          >
            <span style={styles.icon}>🏷️</span>
            Brands
          </NavLink>

          <NavLink
            to="/admin/customers"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {}),
            })}
          >
            <span style={styles.icon}>👥</span>
            Customers
          </NavLink>
        </nav>

        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div style={styles.userName}>{user?.name || 'Admin'}</div>
              <div style={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0a0a0a',
  },
  sidebar: {
    width: '280px',
    background: '#1a1a1a',
    borderRight: '2px solid #333',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto',
  },
  logo: {
    padding: '2rem 1.5rem',
    borderBottom: '2px solid #333',
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    color: '#FFD700',
    margin: 0,
  },
  logoSubtext: {
    color: '#aaa',
    fontSize: '0.85rem',
    margin: '0.3rem 0 0 0',
  },
  nav: {
    flex: 1,
    padding: '1.5rem 0',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    color: '#ccc',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid transparent',
    fontSize: '1rem',
  },
  activeNavLink: {
    background: 'rgba(255, 215, 0, 0.1)',
    borderLeftColor: '#FFD700',
    color: '#FFD700',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: '1.3rem',
  },
  userSection: {
    padding: '1.5rem',
    borderTop: '2px solid #333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  userAvatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: '#FFD700',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '0.95rem',
  },
  userEmail: {
    color: '#aaa',
    fontSize: '0.8rem',
  },
  logoutBtn: {
    width: '100%',
    padding: '0.8rem',
    background: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  mainContent: {
    flex: 1,
    marginLeft: '280px',
    background: '#0a0a0a',
    minHeight: '100vh',
  },
};

export default AdminLayout;
