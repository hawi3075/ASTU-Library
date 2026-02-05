import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, ShieldCheck, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* --- Hero Section --- */}
            <header className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-20 px-6 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <Book className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                        ASTU Digital Library
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
                        Access thousands of academic resources, research papers, and textbooks 
                        specifically curated for the ASTU community.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-lg"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <Globe className="absolute -bottom-20 -right-20 w-96 h-96" />
                </div>
            </header>

            {/* --- Middle Section: Info & Contact --- */}
            <section className="flex-grow py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* Information Text */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering Education through Innovation</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                The ASTU Digital Library serves as the central hub for knowledge. 
                                Our mission is to provide students and faculty with seamless 
                                access to information that drives research and academic excellence 
                                in Science and Technology.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-700">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><ShieldCheck className="w-5 h-5"/></div>
                                    <span className="font-medium">Secure Admin & Student Portals</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700">
                                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Globe className="w-5 h-5"/></div>
                                    <span className="font-medium">24/7 Access to Digital Collections</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact & Support</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-bold text-gray-800">Email Us</p>
                                        <p className="text-gray-600">library.support@astu.edu.et</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-bold text-gray-800">Phone</p>
                                        <p className="text-gray-600">+251 (0) 222 11 00 00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-bold text-gray-800">Location</p>
                                        <p className="text-gray-600">Adama Science and Technology University,<br/>Adama, Ethiopia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Restricted Footer --- */}
            <footer className="bg-white py-10 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center text-white font-bold">A</div>
                        <span className="font-bold text-gray-900 uppercase tracking-widest text-sm">ASTU Library System</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} ASTU ICT Directorate. 
                        <span className="mx-2">|</span> 
                        <span className="text-red-500 font-medium">Access Restricted to Authorized Personnel Only.</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;