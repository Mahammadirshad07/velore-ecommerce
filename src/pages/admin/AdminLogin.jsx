import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple admin credentials check
    if (email === 'admin@velore.com' && password === 'admin123') {
      login({ name: 'Admin User', email: 'admin@velore.com' });
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>VELORE</h1>
          <p style={styles.subtitle}>Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@velore.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" style={styles.loginButton}>
            LOGIN
          </button>
        </form>

        <div style={styles.footer}>
          <a href="/" style={styles.backLink}>
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  loginBox: {
    background: '#1a1a1a',
    border: '2px solid #FFD700',
    borderRadius: '12px',
    padding: '3rem 2.5rem',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(255, 215, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '3rem',
    color: '#FFD700',
    margin: '0 0 0.5rem 0',
    letterSpacing: '0.1em',
  },
  subtitle: {
    color: '#aaa',
    fontSize: '1rem',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#FFD700',
    fontSize: '0.9rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '1rem',
    background: '#0a0a0a',
    border: '2px solid #333',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  error: {
    background: 'rgba(255, 68, 68, 0.1)',
    border: '1px solid #ff4444',
    borderRadius: '6px',
    padding: '1rem',
    color: '#ff4444',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  loginButton: {
    padding: '1rem',
    background: '#FFD700',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  backLink: {
    color: '#FFD700',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'opacity 0.3s ease',
  },
};

export default AdminLogin;
