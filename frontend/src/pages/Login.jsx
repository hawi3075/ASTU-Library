import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronLeft, AlertCircle, Eye, EyeOff, UserPlus } from 'lucide-react'; 
import logo from '../assets/LOGO 2.PNG';

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('userInfo');
        localStorage.setItem('userInfo', JSON.stringify(data));
        setCurrentUser(data);

        const isAdmin = data.role === 'admin' || data.isAdmin === true;
        if (isAdmin) {
          navigate('/admin/dashboard', { replace: true }); 
        } else {
          navigate('/dashboard', { replace: true }); 
        }
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error("Login connection error:", err);
      setError('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-slate-400 hover:text-blue-600 flex items-center gap-2 font-bold transition uppercase text-[10px] tracking-[0.2em]"
        >
          <ChevronLeft size={14} /> Back to Home
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-50/50 p-10 text-center border-b border-blue-100/50">
            <div className="bg-white p-3 rounded-2xl mb-4 shadow-sm inline-block border border-blue-50">
              <img src={logo} alt="ASTU Logo" className="h-14 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tighter">
              Astu <span className="text-blue-600">Digital</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-black mt-2 tracking-[0.3em] uppercase">
              Academic Portal Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 font-bold text-xs p-4 rounded-xl flex items-center gap-3">
                <AlertCircle size={16} className="shrink-0" /> {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="email"
                  placeholder="name@astu.edu.et"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600 transition p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase italic tracking-widest text-xs mt-4 mb-8 ${loading ? 'opacity-70' : 'hover:bg-blue-700'}`}
            >
              {loading ? 'Authenticating...' : 'Enter Library'}
            </button>

            {/* ✅ NEW REGISTER SECTION */}
            <div className="pt-6 border-t border-slate-50 text-center">
               <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-3">
                 New to the system?
               </p>
               <button 
                 type="button"
                 onClick={() => navigate('/register')}
                 className="group flex items-center justify-center gap-2 mx-auto text-blue-600 font-black uppercase italic text-[11px] tracking-tight hover:gap-4 transition-all"
               >
                 <UserPlus size={14} className="text-blue-400 group-hover:text-blue-600" />
                 Create Student Account
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;