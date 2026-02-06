import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Admin Dashboard
import AddBook from './pages/AddBook';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import ImportantBooks from './pages/ImportantBooks';

function App() {
  // --- 👤 USER STATE ---
  // Initial admin user. New students from Register.jsx will be added here.
  const [users, setUsers] = useState([
    { name: "Admin User", email: "admin@astu.edu.et", password: "123", role: "admin" }
  ]);

  // SESSION STATE: Tracks the specific user currently logged in (Hawi or Admin)
  const [currentUser, setCurrentUser] = useState(null);

  // --- 📚 BOOK STATE ---
  // This starts empty and gets filled by your MongoDB Atlas database
  const [books, setBooks] = useState([]);

  // --- 🌐 BACKEND INTEGRATION: Fetch Books from MongoDB ---
  // This runs as soon as the app starts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data); // Updates the UI with books from your database
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
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* LOGIN: We pass setCurrentUser so Login.jsx can "save" the person who logs in */}
        <Route 
          path="/login" 
          element={<Login users={users} setCurrentUser={setCurrentUser} />} 
        />
        
        {/* REGISTER: We pass setUsers so new students are added to your list */}
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
          element={<StudentDashboard books={books} setBooks={setBooks} />} 
        />
        
        {/* PROFILE: Now dynamic! Pass currentUser to show Hawi's or Admin's details */}
        <Route 
          path="/profile" 
          element={<Profile currentUser={currentUser} />} 
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