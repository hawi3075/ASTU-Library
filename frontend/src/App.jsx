import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import AddBook from './pages/AddBook';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import ImportantBooks from './pages/ImportantBooks';
import Inventory from './pages/Inventory';
import UpdateBook from './pages/UpdateBook';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 🚪 GLOBAL LOGOUT LOGIC ---
  const handleLogout = useCallback(() => {
    localStorage.removeItem('userInfo'); 
    setCurrentUser(null);
    // Hard refresh to clear any lingering auth states in the browser memory
    window.location.href = '/login'; 
  }, []);

  // --- 🛠️ SESSION PERSISTENCE ---
  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('userInfo');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          // Ensure the saved data is a valid user object with a role
          if (parsed && (parsed.role || parsed.isAdmin)) {
            setCurrentUser(parsed);
          } else {
            handleLogout();
          }
        } catch (err) {
          console.error("Session recovery failed");
          handleLogout();
        }
      }
      // CRITICAL: Stop loading only after checking storage
      setLoading(false); 
    };

    initializeAuth();
  }, [handleLogout]);

  // --- 🌐 FETCH BOOKS & SESSION CHECK ---
  useEffect(() => {
    // Only fetch if a user is actually logged in
    if (!currentUser) return;

    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        
        // If backend returns 401, token is expired or invalid
        if (response.status === 401) {
          handleLogout();
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        console.error("Backend Error: Ensure server.js is running");
      }
    };
    fetchBooks();
  }, [handleLogout, currentUser]);

  // --- 🛡️ PROTECTED ROUTE COMPONENTS ---
  const AdminRoute = ({ children }) => {
    if (loading) return null; 
    // Verify admin privileges from DB record
    const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.isAdmin === true);
    return isAdmin ? children : <Navigate to="/login" replace />;
  };

  const StudentRoute = ({ children }) => {
    if (loading) return null;
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Login Route with strict redirect logic */}
        <Route 
          path="/login" 
          element={
            loading ? null : (
              currentUser ? (
                // If user exists, redirect based on their specific role
                (currentUser.role === 'admin' || currentUser.isAdmin) 
                  ? <Navigate to="/admin/dashboard" replace /> 
                  : <Navigate to="/dashboard" replace />
              ) : (
                // If storage is empty, finally show Login
                <Login setCurrentUser={setCurrentUser} />
              )
            )
          } 
        />
        
        <Route path="/register" element={<Register />} />

        {/* --- 🛡️ ADMIN PORTAL ROUTES --- */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Dashboard books={books} setBooks={setBooks} currentUser={currentUser} handleLogout={handleLogout} />
          </AdminRoute>
        } />
        
        <Route path="/admin/add-book" element={
          <AdminRoute>
            <AddBook books={books} setBooks={setBooks} handleLogout={handleLogout} />
          </AdminRoute>
        } />

        <Route path="/admin/inventory" element={
          <AdminRoute>
            <Inventory books={books} setBooks={setBooks} handleLogout={handleLogout} />
          </AdminRoute>
        } />

        <Route path="/admin/update-book/:id" element={
          <AdminRoute>
            <UpdateBook handleLogout={handleLogout} />
          </AdminRoute>
        } />

        {/* --- 🎓 STUDENT HUB ROUTES --- */}
        <Route path="/dashboard" element={
          <StudentRoute>
            <StudentDashboard books={books} setBooks={setBooks} currentUser={currentUser} handleLogout={handleLogout} />
          </StudentRoute>
        } />
        
        <Route path="/profile" element={
          <StudentRoute>
            <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout} />
          </StudentRoute>
        } />
        
        <Route path="/important" element={
          <StudentRoute>
            <ImportantBooks books={books} setBooks={setBooks} currentUser={currentUser} handleLogout={handleLogout} />
          </StudentRoute>
        } />

        {/* Fallback for broken URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;