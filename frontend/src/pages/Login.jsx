import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import Context
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data); // 1. Update global Auth state
        toast.success(`Welcome back, ${data.fullName}!`);
        navigate('/dashboard'); // 2. Redirect to Dashboard
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Backend server is offline");
    }
  };

  return (
    // ... your JSX (Input fields for email/password) ...
    <form onSubmit={handleLogin}>
       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
       <button type="submit">SIGN IN</button>
    </form>
  );
};

export default Login;