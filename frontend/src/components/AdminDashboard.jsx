import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AddBookForm from './AddBookForm';
import { Users, BookPlus, ClipboardList, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ books: 0, users: 0, transactions: 0 });

    // Fetch quick stats for the dashboard cards
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const booksRes = await API.get('/books');
                // You'll need routes for these later
                // const usersRes = await API.get('/users'); 
                setStats({
                    books: booksRes.data.length,
                    users: 0, // Placeholder
                    transactions: 0 // Placeholder
                });
            } catch (error) {
                console.error("Error loading dashboard stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <ShieldCheck className="w-6 h-6" />
                        <span className="font-semibold uppercase tracking-wider text-sm">Admin Portal</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900">Librarian Control Panel</h1>
                    <p className="text-gray-600">Manage ASTU library assets and monitor student access.</p>
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

                {/* --- Actions Section --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Add New Book Form */}
                    <div className="lg:col-span-2">
                        <AddBookForm onBookAdded={() => window.location.reload()} />
                    </div>

                    {/* Right: Quick Controls / Admin Tools */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="font-medium">Export Book List (CSV)</span>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="font-medium text-red-600">Flag Overdue Books</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;