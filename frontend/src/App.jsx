import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import AddBook from './pages/AddBook';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import ImportantBooks from './pages/ImportantBooks';

function App() {
  // SESSION STATE
  const [currentUser, setCurrentUser] = useState(null);
  // BOOK STATE
  const [books, setBooks] = useState([]);

  // --- 🛠️ SESSION PERSISTENCE ---
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Session recovery failed");
        localStorage.removeItem('user');
      }
    }
  }, []);

  // --- 🌐 FETCH BOOKS FROM MONGODB ---
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        console.error("Backend Error: Ensure server.js is running on port 5000");
      }
    };
    fetchBooks();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route 
          path="/login" 
          element={<Login setCurrentUser={setCurrentUser} />} 
        />
        
        <Route 
          path="/register" 
          element={<Register />} 
        />

        {/* --- 🛡️ ADMIN ROUTES --- */}
        <Route 
          path="/admin/dashboard" 
          element={<Dashboard books={books} setBooks={setBooks} currentUser={currentUser} />} 
        />
        <Route 
          path="/admin/add-book" 
          element={<AddBook books={books} setBooks={setBooks} />} 
        />

        {/* --- 🎓 STUDENT ROUTES --- */}
        <Route 
          path="/dashboard" 
          element={<StudentDashboard books={books} setBooks={setBooks} currentUser={currentUser} />} 
        />
        
        <Route 
          path="/profile" 
          element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
        />
        
        <Route 
          path="/important" 
          element={<ImportantBooks books={books} setBooks={setBooks} currentUser={currentUser} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;