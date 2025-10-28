import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check localStorage directly instead of AuthContext
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const adminUser = localStorage.getItem('adminUser');
  
  // Parse the admin user data
  let parsedAdminUser = null;
  if (adminUser) {
    try {
      parsedAdminUser = JSON.parse(adminUser);
    } catch (error) {
      console.error('Error parsing admin user:', error);
    }
  }

  // If not logged in, redirect to admin login
  if (!isAdminLoggedIn || !parsedAdminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user has admin role
  if (parsedAdminUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
