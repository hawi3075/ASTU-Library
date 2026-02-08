import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, GraduationCap, MapPin, ShieldCheck, User } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar';
import AdminNavbar from '../components/AdminNavbar';

const Profile = ({ currentUser }) => {
    const navigate = useNavigate();

    // Safety check: If no user is logged in, show the "No Active Session" screen
    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100 max-w-sm w-full">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-6">No Active Session</p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const isAdmin = currentUser.role === 'admin';

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Show correct Navbar based on role */}
            {isAdmin ? <AdminNavbar /> : <StudentNavbar />}

            <main className="max-w-6xl mx-auto p-8 pt-12">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="w-40 h-40 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-200">
                        {/* Displays first two letters of name as initials */}
                        {currentUser.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {currentUser.name}
                        </h1>
                        <p className="text-blue-600 font-black uppercase tracking-[0.2em] mt-3 text-sm italic">
                            {isAdmin ? "University Administrator" : "Mechanical Engineering Student"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Details Section */}
                    <div className="bg-slate-50/50 rounded-[3.5rem] p-12 border border-slate-100">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-10">Personal Details</h3>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-500"><Mail size={22}/></div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="font-bold text-slate-700">{currentUser.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-500"><GraduationCap size={22}/></div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">ID Number</p>
                                    <p className="font-bold text-slate-700">{currentUser.idNumber || "UG/12345/14"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-500"><MapPin size={22}/></div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-bold text-slate-700">Adama, Ethiopia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Status Card */}
                    <div className="bg-blue-600 rounded-[3.5rem] p-12 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
                        <ShieldCheck className="absolute -right-8 -top-8 text-blue-500/30 w-64 h-64 rotate-12" />
                        <div className="relative z-10">
                            <ShieldCheck size={32} className="mb-8" />
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Account Status</h2>
                            <p className="text-blue-100 font-bold mb-10 leading-relaxed">
                                Your account is Verified. You have access to all engineering journals and digital resources.
                            </p>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex justify-between items-center border border-white/10">
                                <span className="text-[10px] font-black uppercase tracking-widest">Library Tier</span>
                                <span className="font-black italic uppercase tracking-tighter bg-white text-blue-600 px-4 py-1 rounded-lg text-sm">Premium Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;