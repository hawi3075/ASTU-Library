import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, IdCard, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/LOGO 2.png';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Ensure keys match your backend: fullName, email, password, idNumber
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        idNumber: '',
        password: '',
        role: 'student' 
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) 
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Registration Successful! Redirecting to login...");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                // Catches "Already Exists" from your authController.js
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            toast.error("Connection failed. Check if backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                
                {/* Royal Blue Header */}
                <div className="bg-[#1e40af] p-8 text-center text-white">
                    <img src={logo} alt="ASTU" className="h-16 mx-auto mb-4 drop-shadow-lg" />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Create Account</h2>
                    <p className="text-blue-200 text-xs italic">ASTU Digital Library System</p>
                </div>

                <form onSubmit={handleRegister} className="p-10 space-y-5">
                    
                    {/* Full Name */}
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-medium"
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
                        <input 
                            type="email" 
                            placeholder="University Email"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-medium"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    {/* ASTU ID Number */}
                    <div className="relative group">
                        <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
                        <input 
                            type="text" 
                            placeholder="ASTU ID (e.g. ART/1234/12)"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-medium"
                            onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                            required
                        />
                    </div>

                    {/* Password with Toggle */}
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-medium"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#1e40af] text-white rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400"
                    >
                        <UserPlus size={20} />
                        {loading ? 'REGISTERING...' : 'REGISTER NOW'}
                    </button>

                    <p className="text-center text-slate-500 font-bold text-sm">
                        Already have an account? 
                        <button 
                            type="button"
                            onClick={() => navigate('/login')} 
                            className="text-blue-600 ml-2 hover:underline cursor-pointer"
                        >
                            Sign In
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;