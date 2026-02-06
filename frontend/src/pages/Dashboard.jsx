import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users, BookOpen, LogOut, Search, Bell, PieChart } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const activities = [
        { id: 1, user: "Abebe Bikila", action: "Borrowed", book: "Intro to Aerospace", date: "10:45 AM" },
        { id: 2, user: "Sara Kassahun", action: "Returned", book: "Organic Chemistry", date: "09:30 AM" },
        { id: 3, user: "John Doe", action: "Reserved", book: "Digital Signal Processing", date: "Yesterday" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
                <div className="p-8 border-b border-slate-800 text-center">
                    <h2 className="text-xl font-black italic text-blue-400 tracking-tighter">ASTU ADMIN</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <button className="w-full flex items-center gap-3 p-4 bg-blue-600 rounded-2xl font-bold">
                        <PieChart size={20} /> Overview
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 hover:bg-slate-800 rounded-2xl font-bold text-slate-400 transition-all">
                        <BookOpen size={20} /> Books
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 p-4 bg-red-500/10 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 italic uppercase">Librarian Panel</h1>
                    <div className="flex items-center gap-4">
                        <Bell size={20} className="text-slate-400" />
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">AD</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-xl shadow-blue-100 cursor-pointer">
                        <PlusCircle size={40} className="mb-4" />
                        <h3 className="text-2xl font-black italic">Deploy Book</h3>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem]">
                        <Users size={40} className="mb-4 text-emerald-500" />
                        <h3 className="text-2xl font-black italic text-slate-800">4,281</h3>
                        <p className="text-slate-500 font-bold">Students</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem]">
                        <BookOpen size={40} className="mb-4 text-purple-500" />
                        <h3 className="text-2xl font-black italic text-slate-800">89%</h3>
                        <p className="text-slate-500 font-bold">Capacity</p>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <tr>
                                <th className="px-8 py-4">Student</th>
                                <th className="px-8 py-4">Action</th>
                                <th className="px-8 py-4">Book</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {activities.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-8 py-5 font-bold text-slate-700">{item.user}</td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black">{item.action}</span>
                                    </td>
                                    <td className="px-8 py-5 text-slate-600">{item.book}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;