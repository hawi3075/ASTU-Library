import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AddBookForm from './AddBookForm';
import UserControl from './UserControl';
import { Users, BookPlus, ClipboardList, ShieldCheck, LogOut, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ books: 0, users: 0, transactions: 0 });
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchStats = async () => {
        setIsRefreshing(true);
        try {
            // Parallel fetching for speed
            const [booksRes, usersRes] = await Promise.all([
                API.get('/books'),
                API.get('/users')
            ]);
            
            setStats({
                books: booksRes.data.length,
                users: usersRes.data.length,
                transactions: 0 // Logic for /api/transactions goes here later
            });
        } catch (error) {
            console.error("Dashboard Sync Error:", error);
            toast.error("Cloud sync failed. Check server connection.");
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        toast.success("Logged out of Admin Portal");
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* --- Top Navigation / Header --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 mb-2">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-widest text-[10px]">ASTU Security Verified</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Librarian Panel</h1>
                        <p className="text-slate-500 mt-1">System Administration & Resource Deployment</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={fetchStats}
                            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                            title="Refresh Data"
                        >
                            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-100 text-red-600 rounded-xl hover:bg-red-50 transition-all font-semibold shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </header>

                {/* --- Key Metrics Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Deployed Books', val: stats.books, icon: BookPlus, color: 'blue' },
                        { label: 'Active Students', val: stats.users, icon: Users, color: 'emerald' },
                        { label: 'Open Loans', val: stats.transactions, icon: ClipboardList, color: 'amber' }
                    ].map((card, i) => (
                        <div key={i} className="bg-white p-7 rounded-[24px] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                                <h3 className="text-4xl font-black text-slate-800">{card.val}</h3>
                            </div>
                            <div className={`bg-${card.color}-50 p-4 rounded-2xl text-${card.color}-600 group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Workspaces --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-10">
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1.5 bg-indigo-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-slate-800">Resource Deployment</h2>
                            </div>
                            <AddBookForm onBookAdded={fetchStats} />
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-slate-800">Student Directory</h2>
                            </div>
                            <UserControl />
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">System Status</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-emerald-400 text-sm font-medium">Server Online</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                                        <p className="text-xs text-slate-400 mb-1">Database Node</p>
                                        <p className="text-sm font-mono">ASTU-Main-Cluster-01</p>
                                    </div>
                                    <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-colors">
                                        Generate Inventory Report
                                    </button>
                                </div>
                            </div>
                            {/* Decorative Background Icon */}
                            <ShieldCheck className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
                        </div>

                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-4">Librarian Policies</h4>
                            <ul className="text-sm text-slate-500 space-y-3">
                                <li className="flex gap-2">
                                    <span className="text-indigo-600">•</span>
                                    Verify student ID before manual returns.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-indigo-600">•</span>
                                    New books require valid ISBN-13.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;