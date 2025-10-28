import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('adminUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Updated password to match your AdminLogin component
    if (email === 'admin@velore.com' && password === 'Kedila@1234') {
      const userData = {
        id: 1,
        email: email,
        role: 'admin',
        name: 'Admin User'
      };
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      localStorage.setItem('isAdminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdminLoggedIn');
  };

  const value = {
    user,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
