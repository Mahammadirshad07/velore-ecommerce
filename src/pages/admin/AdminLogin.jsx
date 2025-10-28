import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin credentials check
    if (email === 'admin@velore.com' && password === 'Kedila@1234') {
      // Store admin session
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify({
        name: 'Admin',
        email: 'admin@velore.com',
        role: 'admin'
      }));
      
      // Redirect to dashboard
      navigate('/admin/dashboard');
    } else {
      alert('Invalid admin credentials!');
    }
  };

  const styles = {
    container: {
      backgroundColor: '#0a0a0a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1rem',
      minHeight: '100vh',
    },
    formBox: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '2rem',
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    },
    title: {
      color: '#FFD700',
      fontSize: '2rem',
      fontFamily: 'serif',
      textAlign: 'center',
      marginBottom: '0.5rem',
      letterSpacing: '0.15em',
    },
    subtitle: {
      color: '#ccc',
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
    },
    inputGroup: {
      marginBottom: '1.25rem',
    },
    label: {
      color: '#FFD700',
      fontSize: '0.875rem',
      marginBottom: '0.5rem',
      display: 'block',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '0.875rem',
      backgroundColor: '#FFD700',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem',
      letterSpacing: '0.05em',
      transition: 'background-color 0.3s ease',
    },
    textCenter: {
      textAlign: 'center',
      color: '#ccc',
      fontSize: '0.9rem',
      marginTop: '1.5rem',
    },
    link: {
      color: '#FFD700',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>ADMIN LOGIN</h1>
        <p style={styles.subtitle}>VELORE Admin Panel</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin Email</label>
            <input
              type="email"
              placeholder="admin@velore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
          >
            LOGIN AS ADMIN
          </button>
        </form>

        <p style={styles.textCenter}>
          <a href="/" style={styles.link}>← Back to Store</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
