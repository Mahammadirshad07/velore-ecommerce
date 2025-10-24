import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    container: {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      background: type === 'success' ? '#4CAF50' : '#ff4444',
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      minWidth: '300px',
      animation: 'slideIn 0.3s ease',
    },
    icon: {
      fontSize: '1.5rem',
    },
    message: {
      fontSize: '0.95rem',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.icon}>
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span style={styles.message}>{message}</span>
    </div>
  );
}

// Add CSS animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Toast;
