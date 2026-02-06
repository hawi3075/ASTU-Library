import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ChevronLeft } from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const Register = ({ users, setUsers }) => {
    const navigate = useNavigate();

    // 1. Create local state for the form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // 2. Handle the registration logic
    const handleRegister = (e) => {
        e.preventDefault();

        // Check if the email is already in our "database"
        const userExists = users.find(u => u.email === formData.email);

        if (userExists) {
            alert("This email is already registered. Please sign in.");
            return;
        }

        // Add the new user to the global state
        const newUser = {
            ...formData,
            role: 'student', // Default role for new sign-ups
            status: 'Verified' // Default status
        };

        setUsers([...users, newUser]);
        
        alert("Registration successful! You can now log in.");
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            
            <div className="max-w-md w-full relative z-10">
                <button 
                    onClick={() => navigate('/')}
                    className="mb-6 text-slate-400 hover:text-blue-600 flex items-center gap-2 font-bold transition-colors uppercase text-xs tracking-widest"
                >
                    <ChevronLeft size={16} /> Back to Home
                </button>

                <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                    <div className="bg-blue-50 p-10 text-center flex flex-col items-center border-b border-blue-100">
                        <div className="bg-white p-3 rounded-2xl mb-6 shadow-sm border border-blue-50">
                            <img src={logo} alt="ASTU Logo" className="h-16 w-auto" />
                        </div>
                        <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tighter">Join Network</h2>
                        <p className="text-blue-600/60 text-xs font-bold mt-2 tracking-widest uppercase">Student Registration</p>
                    </div>

                    {/* 3. Add onSubmit handler to the form */}
                    <form className="p-10 space-y-4" onSubmit={handleRegister}>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition-all"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                            <input 
                                type="email" 
                                placeholder="ASTU Email" 
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition-all"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                            <input 
                                type="password" 
                                placeholder="Create Password" 
                                required
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition-all"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                        
                        <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase italic mt-4">
                            Register Now
                        </button>

                        <p className="text-center font-bold text-sm text-slate-400">
                            Already registered? <button type="button" onClick={() => navigate('/login')} className="text-blue-600 hover:underline">Sign In</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;