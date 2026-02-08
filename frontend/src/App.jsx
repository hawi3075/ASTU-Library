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
  const [users, setUsers] = useState([
    { name: "Admin User", email: "admin@astu.edu.et", password: "123", role: "admin" }
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);

  // --- 🛠️ SESSION PERSISTENCE (ADD THIS) ---
  useEffect(() => {
    // When the app starts, check if a user is saved in the browser
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
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
        console.error("Backend Error: Ensure your server.js is running on port 5000");
      }
    };
    fetchBooks();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Pass setCurrentUser to Login */}
        <Route 
          path="/login" 
          element={<Login users={users} setCurrentUser={setCurrentUser} />} 
        />
        
        <Route 
          path="/register" 
          element={<Register users={users} setUsers={setUsers} />} 
        />

        {/* --- 🛡️ ADMIN ROUTES --- */}
        <Route 
          path="/admin/dashboard" 
          element={<Dashboard users={users} setUsers={setUsers} books={books} setBooks={setBooks} />} 
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
        
        {/* PROFILE: Pass setCurrentUser so you can handle Logout inside Profile if needed */}
        <Route 
          path="/profile" 
          element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
        />
        
        <Route 
          path="/important" 
          element={<ImportantBooks books={books} setBooks={setBooks} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;