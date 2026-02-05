import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Landing from './pages/Landing'; // Import the new Landing page
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// ProtectedRoute ensures only logged-in users reach the dashboard
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        
        <Routes>
          {/* 1. Public Landing Page - Now the starting point */}
          <Route path="/" element={<Landing />} />

          {/* 2. Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 3. Protected Dashboard - Users are redirected here after login */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />

          {/* 4. Catch-all: Redirect unknown paths back to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;