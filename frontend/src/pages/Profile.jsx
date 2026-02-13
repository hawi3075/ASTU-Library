import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, GraduationCap, MapPin, ShieldCheck } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar';
import AdminNavbar from '../components/AdminNavbar';

const Profile = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();

    // Use state or local storage as backup
    const user = currentUser || JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">
                    Back to Login
                </button>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userInfo'); // Consistent with other components
        setCurrentUser(null);
        navigate('/login');
    };

    // Determine if the current user has administrative privileges
    const isAdmin = user.role === 'admin' || user.isAdmin === true;

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {isAdmin ? <AdminNavbar /> : <StudentNavbar />}
            
            <main className="max-w-6xl mx-auto p-8 pt-12">
                <div className="flex items-center gap-8 mb-16">
                    <div className="w-40 h-40 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-lg">
                        {/* Dynamically handle different name property names if they vary */}
                        {(user.fullName || user.name || "AD").substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-slate-900">
                            {user.fullName || user.name || "LIBRARIAN ADMIN"}
                        </h1>
                        
                        {/* ✅ DYNAMIC ROLE LABEL */}
                        <p className="text-blue-600 font-black uppercase tracking-widest text-sm mt-2">
                            {isAdmin ? 'LIBRARIAN ADMIN' : `${user.department || 'Academic'} Student`}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="bg-slate-50 p-10 rounded-[3rem] space-y-8 border border-slate-100">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                <Mail size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</span>
                                <span className="font-bold text-slate-700">{user.email}</span>
                            </div>
                        </div>

                        {/* Only show ID Number if they aren't an admin */}
                        {!isAdmin && (
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                    <GraduationCap size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Student ID</span>
                                    <span className="font-bold text-slate-700">{user.idNumber}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                <MapPin size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Location</span>
                                <span className="font-bold text-slate-700">{user.location || "Adama, Ethiopia"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-10 h-full">
                        <button 
                            onClick={handleLogout} 
                            className="group flex flex-col items-center gap-4 transition-all"
                        >
                            <div className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-red-100 group-hover:text-red-500 transition-all">
                                <ShieldCheck size={32} />
                            </div>
                            <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] group-hover:text-red-500 transition-all">
                                Logout Session
                            </span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;