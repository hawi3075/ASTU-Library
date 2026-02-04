import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';

// This helper component protects your dashboard
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  // If not logged in, force them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Toaster enables those success/error popups you added */}
        <Toaster position="top-right" />
        
        <Routes>
          {/* 1. Login Page */}
          <Route path="/login" element={<Login />} />

          {/* 2. Protected Home Page (Dashboard) */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />

          {/* 3. Automatic Redirect for any other path */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;