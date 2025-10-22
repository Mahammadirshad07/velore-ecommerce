import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
      const users = await response.json();
      
      if (users.length > 0) {
        const user = users[0];
        
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        alert(`Welcome back, ${user.name}!`);
        
      
        navigate('/');
      } else {
        alert('Invalid email or password!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Network error! Make sure json-server is running on port 5000.');
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
    },
    divider: {
      textAlign: 'center',
      margin: '1.5rem 0',
      color: '#888',
      fontSize: '0.9rem',
    },
    link: {
      color: '#FFD700',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    textCenter: {
      textAlign: 'center',
      color: '#ccc',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>LOGIN</h1>
        <p style={styles.subtitle}>Welcome back to VELORE</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>

        <p style={styles.divider}>───── OR ─────</p>

        <p style={styles.textCenter}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
