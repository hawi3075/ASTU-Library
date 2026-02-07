import React from 'react';
import {
  User,
  Mail,
  GraduationCap,
  MapPin,
  Edit3,
  Settings,
} from 'lucide-react';

const Profile = () => {
  // Later this can come from context / auth / API
  const user = {
    name: 'Abebe Bikila',
    email: 'abebe.bikila@astu.edu.et',
    department: 'Mechanical Engineering',
    role: 'Student',
    studentId: 'UG/12345/14',
    location: 'Adama, Ethiopia',
    tier: 'Premium Access',
    status: 'Verified',
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-end gap-8 mb-12">
          <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200 border-4 border-white">
            {initials}
          </div>

          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-black italic uppercase text-slate-900">
              {user.name}
            </h1>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              {user.department} {user.role}
            </p>
          </div>

          <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition">
            <Edit3 size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-6">
            <h3 className="font-black uppercase italic text-slate-400 text-sm tracking-widest">
              Personal Details
            </h3>

            <div className="flex items-center gap-4 text-slate-700 font-bold">
              <Mail className="text-blue-500" size={20} />
              {user.email}
            </div>

            <div className="flex items-center gap-4 text-slate-700 font-bold">
              <GraduationCap className="text-blue-500" size={20} />
              ID: {user.studentId}
            </div>

            <div className="flex items-center gap-4 text-slate-700 font-bold">
              <MapPin className="text-blue-500" size={20} />
              {user.location}
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
            <Settings className="mb-4 opacity-50" size={24} />
            <h3 className="text-2xl font-black italic mb-2">
              Account Status
            </h3>
            <p className="text-blue-100 font-medium mb-6 text-sm leading-relaxed">
              Your account is {user.status}. You have access to all engineering
              journals and digital resources.
            </p>

            <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center">
              <span className="font-black italic uppercase text-xs">
                Library Tier
              </span>
              <span className="font-black uppercase text-xs">
                {user.tier}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
