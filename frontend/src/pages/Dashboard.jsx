import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Users, BookOpen, Trash2, ShieldAlert, 
    PlusCircle, LogOut, LayoutDashboard, UserCheck, Search
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users'); // Toggle between 'users' and 'books'

    // Sample State for Users - In a real app, this would come from your Database
    const [users, setUsers] = useState([
        { id: 1, name: "Abebe Bikila", email: "abebe@astu.edu.et", status: "Verified", date: "Feb 01, 2026" },
        { id: 2, name: "Unknown User", email: "illegal@hacker.com", status: "Suspicious", date: "Feb 05, 2026" },
        { id: 3, name: "Sara Kassahun", email: "sara@astu.edu.et", status: "Verified", date: "Jan 28, 2026" },
    ]);

    // Sample State for Books
    const [books, setBooks] = useState([
        { id: 1, title: "Quantum Mechanics", stock: 12, category: "Physics" },
        { id: 2, title: "Data Structures", stock: 8, category: "Computing" },
        { id: 3, title: "Applied Math", stock: 15, category: "Mathematics" },
    ]);

    // Function to delete illegal/suspicious users
    const deleteUser = (id) => {
        if(window.confirm("SECURITY ALERT: Are you sure you want to delete this user? They will lose all access to ASTU Library.")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-sans">
            
            {/* --- SIDEBAR NAVIGATION --- */}
            <aside className="w-72 bg-slate-900 text-white flex flex-col hidden md:flex sticky top-0 h-screen">
                <div className="p-8 border-b border-slate-800 text-center">
                    <h2 className="text-2xl font-black italic text-blue-400 tracking-tighter">ASTU ADMIN</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Librarian Panel</p>
                </div>

                <nav className="flex-1 p-6 space-y-3 mt-4">
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] font-bold transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Users size={22} /> User Security
                    </button>
                    <button 
                        onClick={() => setActiveTab('books')}
                        className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] font-bold transition-all ${activeTab === 'books' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <BookOpen size={22} /> Book Inventory
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 p-4 bg-red-500/10 text-red-500 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all uppercase italic text-sm">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
                            {activeTab === 'users' ? 'Registration Control' : 'Library Management'}
                        </h1>
                        <p className="text-slate-400 font-bold text-sm">Welcome back, Head Librarian</p>
                    </div>
                </header>

                {/* --- TAB 1: USER SECURITY CONTROL --- */}
                {activeTab === 'users' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="text-blue-600" />
                                    <span className="font-black text-slate-800 uppercase italic tracking-tight">Active Registrations ({users.length})</span>
                                </div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-200">
                                    Real-time Monitor
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5">Full Name</th>
                                        <th className="px-8 py-5">Email Address</th>
                                        <th className="px-8 py-5">Security Status</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-8 py-6 font-bold text-slate-800">{user.name}</td>
                                            <td className="px-8 py-6 text-slate-500 font-medium">{user.email}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${user.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100 animate-pulse'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button 
                                                    onClick={() => deleteUser(user.id)}
                                                    className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                                                    title="Delete Illegal User"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: BOOK INVENTORY CONTROL --- */}
                {activeTab === 'books' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Add Book Promo Card */}
                        <div className="relative bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-200 flex flex-col md:flex-row justify-between items-center overflow-hidden">
                            <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Deploy Resources</h3>
                                <p className="text-blue-100 font-bold opacity-80">Upload new textbooks to the ASTU Digital Network</p>
                            </div>
                            <button 
                                onClick={() => navigate('/admin/add-book')}
                                className="relative z-10 bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 hover:bg-blue-50 hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase tracking-widest text-sm"
                            >
                                <PlusCircle size={22} /> Add New Book
                            </button>
                            {/* Decorative background circle */}
                            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        </div>

                        {/* Inventory Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {books.map(book => (
                                <div key={book.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                                        <BookOpen className="text-blue-500" size={24} />
                                    </div>
                                    <h4 className="font-black text-slate-900 text-xl uppercase italic tracking-tight mb-1">{book.title}</h4>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{book.category}</p>
                                    
                                    <div className="flex justify-between items-end border-t border-slate-50 pt-6">
                                        <div>
                                            <p className="text-2xl font-black text-slate-900">{book.stock}</p>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Copies</p>
                                        </div>
                                        <button className="text-blue-600 font-black text-xs uppercase hover:underline">Edit Info</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;