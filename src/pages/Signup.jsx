import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = existingUsers.some(user => user.email === email);
      
      if (emailExists) {
        alert('Email already registered! Please login.');
        navigate('/login');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      alert('Account created successfully! Please login.');
      navigate('/login');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account. Please try again!');
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
    helperText: {
      color: '#888',
      fontSize: '0.75rem',
      marginTop: '0.3rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>SIGN UP</h1>
        <p style={styles.subtitle}>Create your VELORE account</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
            />
            <p style={styles.helperText}>Must be at least 6 characters</p>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p style={styles.divider}>───── OR ─────</p>

        <p style={styles.textCenter}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
