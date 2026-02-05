import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AddBookForm from './AddBookForm';
import UserControl from './UserControl'; // Import the new User Control component
import { Users, BookPlus, ClipboardList, ShieldCheck, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ books: 0, users: 0, transactions: 0 });

    const fetchStats = async () => {
        try {
            // Fetching all data in parallel for efficiency
            const [booksRes, usersRes] = await Promise.all([
                API.get('/books'),
                API.get('/users')
            ]);
            
            setStats({
                books: booksRes.data.length,
                users: usersRes.data.length,
                transactions: 0 // Update this once transactionRoutes are ready
            });
        } catch (error) {
            console.error("Error loading dashboard stats", error);
            toast.error("Failed to refresh library stats");
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* --- Header --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-blue-700 mb-2">
                            <ShieldCheck className="w-6 h-6" />
                            <span className="font-semibold uppercase tracking-wider text-sm">Admin Portal</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900">Librarian Control Panel</h1>
                        <p className="text-gray-600">Manage ASTU library assets and monitor student access.</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </header>

                {/* --- Stats Overview --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Deployed Books</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.books}</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                            <BookPlus className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Registered Students</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.users}</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl text-green-600">
                            <Users className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Transactions</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.transactions}</h3>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                            <ClipboardList className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* --- Main Dashboard Sections --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Middle Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Section 1: Add New Book */}
                        <AddBookForm onBookAdded={fetchStats} />

                        {/* Section 2: User Control Table */}
                        <UserControl />
                    </div>

                    {/* Right Column: Tools */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Librarian Tools</h2>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all flex items-center gap-3 group">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                                    <span className="font-medium">Export Book List (CSV)</span>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all flex items-center gap-3 group">
                                    <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform"></div>
                                    <span className="font-medium text-red-600">Flag Overdue Books</span>
                                </button>
                                <div className="pt-4 border-t border-gray-100 mt-4">
                                    <p className="text-xs text-gray-400">System Version 1.0.4</p>
                                    <p className="text-xs text-gray-400">Connected to: ASTU-DB-Primary</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;