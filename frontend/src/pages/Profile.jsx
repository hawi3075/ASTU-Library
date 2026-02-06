import React from 'react';
import { User, Mail, GraduationCap, MapPin, Edit3, Settings } from 'lucide-react';

const Profile = () => {
    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-end gap-8 mb-12">
                    <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200 border-4 border-white">
                        AB
                    </div>
                    <div className="flex-1 pb-2">
                        <h1 className="text-4xl font-black italic uppercase text-slate-900">Abebe Bikila</h1>
                        <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Mechanical Engineering Student</p>
                    </div>
                    <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit3 size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-6">
                        <h3 className="font-black uppercase italic text-slate-400 text-sm tracking-widest mb-4">Personal Details</h3>
                        <div className="flex items-center gap-4 text-slate-700 font-bold">
                            <Mail className="text-blue-500" size={20} /> abebe.bikila@astu.edu.et
                        </div>
                        <div className="flex items-center gap-4 text-slate-700 font-bold">
                            <GraduationCap className="text-blue-500" size={20} /> ID: UG/12345/14
                        </div>
                        <div className="flex items-center gap-4 text-slate-700 font-bold">
                            <MapPin className="text-blue-500" size={20} /> Adama, Ethiopia
                        </div>
                    </div>

                    <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
                        <Settings className="mb-4 opacity-50" size={24} />
                        <h3 className="text-2xl font-black italic mb-2">Account Status</h3>
                        <p className="text-blue-100 font-medium mb-6 text-sm leading-relaxed">Your account is verified. You have access to all engineering journals and digital resources.</p>
                        <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center">
                            <span className="font-black italic uppercase text-xs">Library Tier</span>
                            <span className="font-black uppercase text-xs">Premium Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;