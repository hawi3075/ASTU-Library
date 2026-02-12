import React, { useState, useEffect } from 'react';
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

  // --- 🛠️ SESSION PERSISTENCE ---
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Session recovery failed");
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false);
  }, []);

  // --- 🌐 FETCH BOOKS ---
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        console.error("Backend Error: Ensure server.js is running");
      }
    };
    fetchBooks();
  }, []);

  // --- 🛡️ PROTECTED ROUTE COMPONENTS ---
  const AdminRoute = ({ children }) => {
    if (loading) return null;
    return currentUser && (currentUser.isAdmin || currentUser.role === 'admin') 
      ? children 
      : <Navigate to="/login" />;
  };

  const StudentRoute = ({ children }) => {
    if (loading) return null;
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Redirect logged-in users away from Login/Register */}
        <Route 
          path="/login" 
          element={currentUser ? (
            currentUser.isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />
          ) : <Login setCurrentUser={setCurrentUser} />} 
        />
        
        <Route path="/register" element={<Register />} />

        {/* --- 🛡️ ADMIN ONLY ROUTES --- */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Dashboard books={books} setBooks={setBooks} currentUser={currentUser} />
          </AdminRoute>
        } />
        
        <Route path="/admin/add-book" element={
          <AdminRoute>
            <AddBook books={books} setBooks={setBooks} />
          </AdminRoute>
        } />

        <Route path="/admin/inventory" element={
          <AdminRoute>
            <Inventory />
          </AdminRoute>
        } />

        <Route path="/admin/update-book/:id" element={
          <AdminRoute>
            <UpdateBook />
          </AdminRoute>
        } />

        {/* --- 🎓 STUDENT ROUTES --- */}
        <Route path="/dashboard" element={
          <StudentRoute>
            <StudentDashboard books={books} setBooks={setBooks} currentUser={currentUser} />
          </StudentRoute>
        } />
        
        <Route path="/profile" element={
          <StudentRoute>
            <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </StudentRoute>
        } />
        
        <Route path="/important" element={
          <StudentRoute>
            <ImportantBooks books={books} setBooks={setBooks} currentUser={currentUser} />
          </StudentRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;