import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronLeft, AlertCircle, Eye, EyeOff } from 'lucide-react'; 
import logo from '../assets/LOGO 2.PNG';

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- 🌐 DATABASE LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Save user data to App state
        setCurrentUser(data.user);

        // 2. Save to localStorage to persist the session
        localStorage.setItem('user', JSON.stringify(data.user));

        // 3. Role-based redirect
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Displays "Invalid email or password" or other backend messages
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error("Login connection error:", err);
      setError('Cannot connect to server. Ensure your backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-slate-400 hover:text-blue-600 flex items-center gap-2 font-bold transition uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Home
        </button>

        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 p-10 text-center border-b border-blue-100">
            <div className="bg-white p-3 rounded-2xl mb-6 shadow-sm inline-block border border-blue-50">
              <img src={logo} alt="ASTU Logo" className="h-16 w-auto" />
            </div>
            <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tight">
              Portal Sign In
            </h2>
            <p className="text-blue-600/60 text-xs font-bold mt-2 tracking-widest uppercase">
              Academic Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-10 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 font-bold text-sm p-4 rounded-2xl flex items-center gap-3">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input
                type="email"
                placeholder="University Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-medium transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-medium transition"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600 transition p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-100 transition active:scale-95 uppercase italic ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {loading ? 'Verifying...' : 'Access Library'}
            </button>

            <p className="text-center font-bold text-sm text-slate-400">
              New student?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:underline font-bold"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;