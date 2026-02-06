import React, { useState } from 'react';
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
  // We store registered users here so Login can check against them.
  // I added a default Admin so you can always log in to the admin panel.
  const [users, setUsers] = useState([
    { name: "Admin User", email: "admin@astu.edu.et", password: "123", role: "admin" }
  ]);

  // --- 📚 BOOK STATE ---
  const [books, setBooks] = useState([
    { id: 1, title: "Quantum Mechanics", author: "Griffiths", category: "Physics", isImportant: false },
    { id: 2, title: "Data Structures", author: "Mark Allen", category: "Computing", isImportant: false }
  ]);

  return (
    <Router>
      <Routes>
        {/* Public Routes - Now passing users and setUsers */}
        <Route path="/" element={<Landing />} />
        
        {/* Login needs users list to verify credentials */}
        <Route path="/login" element={<Login users={users} />} />
        
        {/* Register needs setUsers to save new students */}
        <Route path="/register" element={<Register users={users} setUsers={setUsers} />} />

        {/* Admin Side Integration */}
        <Route 
          path="/admin/dashboard" 
          element={<Dashboard users={users} setUsers={setUsers} books={books} setBooks={setBooks} />} 
        />
        <Route path="/admin/add-book" element={<AddBook books={books} setBooks={setBooks} />} />

        {/* Student Side Integration */}
        <Route path="/dashboard" element={<StudentDashboard books={books} setBooks={setBooks} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/important" element={<ImportantBooks books={books} setBooks={setBooks} />} />
      </Routes>
    </Router>
  );
}

export default App;