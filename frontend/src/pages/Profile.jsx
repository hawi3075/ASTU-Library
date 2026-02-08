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
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-xl">
                    Back to Login
                </button>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white">
            {user.role === 'admin' ? <AdminNavbar /> : <StudentNavbar />}
            <main className="max-w-6xl mx-auto p-8">
                <div className="flex items-center gap-8 mb-16">
                    <div className="w-40 h-40 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-5xl font-black">
                        {user.fullName?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-5xl font-black uppercase italic">{user.fullName}</h1>
                        <p className="text-blue-600 font-bold uppercase">{user.department} Student</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-10 rounded-[3rem] space-y-6">
                        <div className="flex items-center gap-4">
                            <Mail className="text-blue-500" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <GraduationCap className="text-blue-500" />
                            <span>{user.idNumber}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <MapPin className="text-blue-500" />
                            <span>{user.location || "Adama, Ethiopia"}</span>
                        </div>
                    </div>
                    
                    <button onClick={handleLogout} className="mt-4 text-red-500 font-bold uppercase tracking-widest text-xs hover:underline">
                        Logout Session
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Profile;