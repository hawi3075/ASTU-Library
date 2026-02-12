import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import { BookOpen, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('users');

    // Fetch data from Backend on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Get the token from localStorage
                const userInfo = localStorage.getItem('userInfo');
                const token = userInfo ? JSON.parse(userInfo).token : null;

                const config = {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
                };

                // Fetching real data from your MongoDB via the backend
                const usersRes = await axios.get('http://localhost:5000/api/users', config);
                const booksRes = await axios.get('http://localhost:5000/api/books', config);

                setUsers(usersRes.data);
                setBooks(booksRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to remove this user?")) {
            try {
                const userInfo = localStorage.getItem('userInfo');
                const token = userInfo ? JSON.parse(userInfo).token : null;
                
                await axios.delete(`http://localhost:5000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Update UI after deletion
                setUsers(users.filter(user => (user._id || user.id) !== id));
            } catch (error) {
                alert("Failed to delete user");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="text-2xl font-black italic text-blue-600 animate-pulse">
                    LOADING ASTU DATA...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc]">
            <AdminNavbar />
            
            <main className="max-w-7xl mx-auto p-8">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">
                            Control <span className="text-blue-600">Center</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-[0.2em]">Security & Library Oversight</p>
                    </div>

                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button 
                            onClick={() => setActiveView('users')}
                            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${activeView === 'users' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                        >
                            User Registry
                        </button>
                        <button 
                            onClick={() => setActiveView('inventory')}
                            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${activeView === 'inventory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                        >
                            Inventory
                        </button>
                    </div>
                </header>

                {activeView === 'users' ? (
                    <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                <tr>
                                    <th className="p-8">Name</th>
                                    <th className="p-8">Email</th>
                                    <th className="p-8">Role</th>
                                    <th className="p-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users && users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.email} className="hover:bg-slate-50/50 transition-colors">
                                            {/* IMPORTANT: use fullName to match your Atlas data */}
                                            <td className="p-8 font-bold text-slate-800">{user.fullName}</td>
                                            <td className="p-8 text-slate-500">{user.email}</td>
                                            <td className="p-8">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${user.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-8 text-right">
                                                {user.role !== 'admin' && (
                                                    <button onClick={() => deleteUser(user._id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                                                        <Trash2 size={20} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                                            No users registered in the system yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {books && books.length > 0 ? (
                            books.map(book => (
                                <div key={book._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <BookOpen className="text-blue-200 mb-4" size={32} />
                                    <h4 className="font-black text-slate-800 uppercase italic leading-tight mb-1">{book.title}</h4>
                                    <p className="text-slate-400 text-xs font-bold mb-4 uppercase">{book.category}</p>
                                    <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest">In Stock</span>
                                        <span className="font-black text-blue-600">Available</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
                                <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em]">The Library Inventory is Empty</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;