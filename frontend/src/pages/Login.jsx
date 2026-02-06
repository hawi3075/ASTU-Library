import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronLeft } from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const Login = ({ users }) => {
    const navigate = useNavigate();

    // 1. Local state for login inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. Authentication Logic
    const handleLogin = (e) => {
        e.preventDefault();

        // Find user by email AND password in the global users state
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // 3. Role-based Redirection
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } else {
            // Error handling
            alert("❌ Access Denied: Invalid Email or Password. Please register if you haven't already.");
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            
            <div className="max-w-md w-full relative z-10">
                <button 
                    onClick={() => navigate('/')}
                    className="mb-6 text-slate-400 hover:text-blue-600 flex items-center gap-2 font-bold transition-colors uppercase text-xs tracking-widest"
                >
                    <ChevronLeft size={16} /> Back to Home
                </button>

                <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                    {/* LIGHT BLUE HEADER */}
                    <div className="bg-blue-50 p-10 text-center flex flex-col items-center border-b border-blue-100">
                        <div className="bg-white p-3 rounded-2xl mb-6 shadow-sm border border-blue-50">
                            <img src={logo} alt="ASTU Logo" className="h-16 w-auto" />
                        </div>
                        <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tighter">Portal Sign In</h2>
                        <p className="text-blue-600/60 text-xs font-bold mt-2 tracking-widest uppercase">Academic Access</p>
                    </div>

                    {/* 4. Use handleLogin for form submission */}
                    <form className="p-10 space-y-5" onSubmit={handleLogin}>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                            <input 
                                type="email" 
                                placeholder="University Email" 
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-medium transition-all" 
                                required 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-medium transition-all" 
                                required 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 uppercase italic">
                            Access Library
                        </button>

                        <p className="text-center font-bold text-sm text-slate-400">
                            New student? <button type="button" onClick={() => navigate('/register')} className="text-blue-600 hover:underline font-bold">Create Account</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;