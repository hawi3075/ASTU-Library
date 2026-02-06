import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Auth (Optional depending on your setup)
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import Dashboard from './pages/Dashboard';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import ImportantBooks from './pages/ImportantBooks';

function App() {
  // Shared State: We keep the books here so both Admin and Student can see them
  const [books, setBooks] = useState([
    { id: 1, title: "Quantum Mechanics", author: "Griffiths", category: "Physics", isImportant: false },
    { id: 2, title: "Data Structures", author: "Mark Allen", category: "CS", isImportant: false },
    { id: 3, title: "Thermodynamics", author: "Cengel", category: "Mechanical", isImportant: false },
  ]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard books={books} setBooks={setBooks} />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<StudentDashboard books={books} setBooks={setBooks} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/important" element={<ImportantBooks books={books} />} />
      </Routes>
    </Router>
  );
}

export default App;