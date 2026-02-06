import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, Star, User, LogOut } from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const StudentNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Library', path: '/dashboard', icon: <Book size={18} /> },
        { name: 'My Collection', path: '/important', icon: <Star size={18} /> },
        { name: 'Profile', path: '/profile', icon: <User size={18} /> },
    ];

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <img src={logo} alt="ASTU" className="h-10 w-auto" />
                <span className="font-black italic text-blue-600 hidden md:block">ASTU DIGITAL</span>
            </div>

            <div className="flex items-center gap-2 md:gap-8">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm uppercase italic tracking-tight ${
                            location.pathname === item.path 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                            : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                        {item.icon}
                        <span className="hidden sm:inline">{item.name}</span>
                    </button>
                ))}
                
                <button 
                    onClick={() => navigate('/login')}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </nav>
    );
};

export default StudentNavbar;