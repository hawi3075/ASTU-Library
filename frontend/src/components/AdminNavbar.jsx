import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, BookPlus, User, LogOut, LayoutDashboard } from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Manage', path: '/admin/dashboard', icon: <ShieldCheck size={18} /> },
        { name: 'Deploy Book', path: '/admin/add-book', icon: <BookPlus size={18} /> },
        { name: 'Profile', path: '/profile', icon: <User size={18} /> },
    ];

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
                <img src={logo} alt="ASTU" className="h-10 w-auto" />
                <div className="flex flex-col">
                    <span className="font-black italic text-slate-900 leading-none">ASTU ADMIN</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Librarian Portal</span>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black transition-all text-xs uppercase italic tracking-tight ${
                            location.pathname === item.path 
                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                            : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        {item.icon}
                        <span className="hidden sm:inline">{item.name}</span>
                    </button>
                ))}
                
                <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

                <button 
                    onClick={() => navigate('/login')}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;