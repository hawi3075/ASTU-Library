
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      {/* This enables the pop-up notifications we set up earlier */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Router>
        <Routes>
          {/* This makes the login page show up by default at http://localhost:5173 */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;