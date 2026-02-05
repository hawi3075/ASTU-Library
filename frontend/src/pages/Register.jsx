import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Hash, Shield } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        idNumber: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sends name, email, password, idNumber, and role to your backend
            const { data } = await API.post('/auth/register', formData);
            
            toast.success("Registration Successful! Please login.");
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <UserPlus className="mx-auto h-12 w-12 text-blue-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-600">ASTU Digital Library System</p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            name="name" type="text" required
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Full Name"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            name="email" type="email" required
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Email Address"
                            onChange={handleChange}
                        />
                    </div>

                    {/* ID Number Field */}
                    <div className="relative">
                        <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            name="idNumber" type="text" required
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="ASTU ID Number (e.g. ATR/1234/12)"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="relative">
                        <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                            name="role"
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white appearance-none"
                            onChange={handleChange}
                            value={formData.role}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Librarian (Admin)</option>
                        </select>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            name="password" type="password" required
                            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex justify-center"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;