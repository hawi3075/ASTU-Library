import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { UserCheck, Mail, Hash } from 'lucide-react';

const UserControl = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await API.get('/users');
                setUsers(data);
            } catch (error) {
                console.error("Failed to load users", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Registered Students</h2>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    {users.length} Total
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                        <tr>
                            <th className="p-4 font-semibold">Student Name</th>
                            <th className="p-4 font-semibold">ASTU ID</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-full text-blue-500">
                                        <UserCheck className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-gray-800">{u.name}</span>
                                </td>
                                <td className="p-4 text-gray-600 font-mono text-sm">
                                    {u.idNumber || 'N/A'}
                                </td>
                                <td className="p-4 text-gray-600">{u.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                        {u.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserControl;