import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ChevronLeft, Fingerprint, Eye, EyeOff, BookOpen } from 'lucide-react';
// ✅ IMPORT your updated Axios instance
import API from '../services/api'; 
import logo from '../assets/LOGO 2.PNG';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    idNumber: '',
    department: '', 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.department) {
        alert("Please select a department from the list.");
        return;
    }

    setLoading(true);

    try {
      // ✅ CHANGED: Use API.post instead of fetch
      const { data } = await API.post('/auth/register', {
          fullName: formData.fullName,
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          idNumber: formData.idNumber,
          department: formData.department,
          role: 'student' 
      });

      // ✅ Axios only reaches here if the response status is 2xx
      alert('Registration successful! Please log in.');
      navigate('/login');

    } catch (err) {
      // ✅ IMPROVED: This captures the specific message from your AuthController
      const errorMessage = err.response?.data?.message || 'Registration failed';
      console.error("Registration Error:", err);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-md w-full relative z-10">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-slate-400 hover:text-blue-600 flex items-center gap-2 font-bold transition uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Home
        </button>

        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          <div className="bg-blue-50 p-10 text-center flex flex-col items-center border-b border-blue-100">
            <div className="bg-white p-3 rounded-2xl mb-6 shadow-sm border border-blue-50">
              <img src={logo} alt="ASTU Logo" className="h-16 w-auto" />
            </div>
            <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tight">
              Join Network
            </h2>
            <p className="text-blue-600/60 text-xs font-bold mt-2 tracking-widest uppercase">
              Student Registration
            </p>
          </div>

          <form onSubmit={handleRegister} className="p-10 space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition"
              />
            </div>

            <div className="relative">
              <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input
                type="text"
                placeholder="ASTU ID (e.g. UG/12345/14)"
                required
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition"
              />
            </div>

            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <select
                required
                name="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition appearance-none text-slate-600 font-medium cursor-pointer"
              >
                <option value="" disabled>Select Department</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Architecture">Architecture</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">
                <ChevronLeft className="-rotate-90" size={16} />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input
                type="email"
                placeholder="ASTU Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password (min 6 chars)"
                required
                minLength={6} 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl transition active:scale-95 uppercase italic mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}
            >
              {loading ? 'Processing...' : 'Register Now'}
            </button>

            <p className="text-center font-bold text-sm text-slate-400">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:underline font-bold"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;