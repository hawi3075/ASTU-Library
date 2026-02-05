import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ShieldCheck, Globe, Mail, Phone, MapPin, Building2, 
    BookOpen, ChevronRight, Zap, Atom, Sigma, Cpu, FlaskConical 
} from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const Landing = () => {
    const navigate = useNavigate();

    const collectionPreview = [
        { 
            title: "Physics for Scientists", 
            author: "Serway & Jewett", 
            icon: <Atom className="w-16 h-16 text-white/90" />, 
            gradient: "from-blue-600 to-indigo-500",
            pattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent",
            tag: "Engineering" 
        },
        { 
            title: "Applied Mathematics", 
            author: "K.A. Stroud", 
            icon: <Sigma className="w-16 h-16 text-white/90" />, 
            gradient: "from-emerald-600 to-teal-500",
            pattern: "bg-[repeating-linear-gradient(45deg,_transparent,_transparent_10px,_rgba(255,255,255,0.05)_10px,_rgba(255,255,255,0.05)_20px)]",
            tag: "Mathematics" 
        },
        { 
            title: "Digital Logic Design", 
            author: "M. Morris Mano", 
            icon: <Cpu className="w-16 h-16 text-white/90" />, 
            gradient: "from-orange-500 to-amber-500",
            pattern: "bg-[linear-gradient(to_right,_rgba(255,255,255,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]",
            tag: "Computing" 
        },
        { 
            title: "University Chemistry", 
            author: "Raymond Chang", 
            icon: <FlaskConical className="w-16 h-16 text-white/90" />, 
            gradient: "from-rose-600 to-red-500",
            pattern: "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1)_0%,_transparent_50%)]",
            tag: "Science" 
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* --- Hero Section --- */}
            <header className="relative bg-[#1e40af] py-16 px-6 text-white text-center overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <img src={logo} alt="ASTU" className="h-24 w-auto mx-auto mb-6 drop-shadow-2xl" />
                    
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight drop-shadow-sm uppercase">
                        ASTU Digital Library
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-12 font-light italic opacity-90">
                        "We are dedicated to innovative knowledge."
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button 
                            onClick={() => navigate('/login')}
                            className="group px-12 py-4 bg-white text-blue-700 font-black rounded-full shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            SIGN IN <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button 
                            onClick={() => navigate('/register')}
                            className="group flex items-center justify-center gap-2 px-12 py-4 bg-transparent border-2 border-white text-white font-black rounded-full hover:bg-white/10 transition-all shadow-xl"
                        >
                            <Zap className="w-5 h-5 text-yellow-400" />
                            JOIN NOW
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Globe className="absolute -bottom-20 -right-20 w-96 h-96" />
                </div>
            </header>

            {/* --- Book Collection Showcase --- */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between mb-12 border-l-4 border-blue-600 pl-6">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-2">Academic Core</h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Essential Resources for Students</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {collectionPreview.map((book, idx) => (
                            <div key={idx} className="group bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-4 hover:-translate-y-3 transition-all duration-300">
                                <div className={`relative bg-gradient-to-br ${book.gradient} aspect-[3/4] rounded-[2rem] mb-6 shadow-lg overflow-hidden flex flex-col items-center justify-center`}>
                                    <div className={`absolute inset-0 ${book.pattern}`}></div>
                                    <div className="relative z-10 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl group-hover:scale-110 transition-transform">
                                        {book.icon}
                                    </div>
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/20 backdrop-blur-md text-[10px] font-black text-white rounded-full uppercase tracking-widest border border-white/10">
                                        {book.tag}
                                    </div>
                                </div>
                                <div className="px-2 pb-2">
                                    <h4 className="font-black text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                                        {book.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- University Contacts Section --- */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* International Relations Office */}
                        <div className="p-10 rounded-[3rem] bg-blue-50 border-2 border-blue-100 group hover:bg-blue-600 transition-all duration-500 cursor-default shadow-sm hover:shadow-2xl">
                            <Building2 className="w-12 h-12 text-blue-600 mb-6 group-hover:text-white transition-colors" />
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-6 transition-colors">
                                International Relations
                            </h3>
                            <div className="space-y-4 text-slate-600 group-hover:text-blue-50 font-medium transition-colors">
                                <p className="flex items-center gap-3"><Phone className="w-5 h-5 opacity-70"/> +251-22-211-3961</p>
                                <p className="flex items-center gap-3"><Mail className="w-5 h-5 opacity-70"/> irccd@astu.edu.et</p>
                                <p className="flex items-center gap-3"><MapPin className="w-5 h-5 opacity-70"/> P.O.Box: 1888 Adama, Ethiopia</p>
                            </div>
                        </div>

                        {/* Office of Registrar */}
                        <div className="p-10 rounded-[3rem] bg-slate-50 border-2 border-slate-100 group hover:bg-blue-600 transition-all duration-500 cursor-default shadow-sm hover:shadow-2xl">
                            <div>
                                <ShieldCheck className="w-12 h-12 text-red-600 mb-6 group-hover:text-white transition-colors" />
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-4 tracking-tight transition-colors">
                                    Office of Registrar
                                </h3>
                                <div className="space-y-1 text-slate-600 group-hover:text-blue-50 font-bold transition-colors">
                                    <p>Phone: +251-221-100001</p>
                                    <p>Email: sar@astu.edu.et</p>
                                </div>
                            </div>
                            
                            
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Professional Footer --- */}
            <footer className="py-12 bg-slate-900 text-white text-center">
                <div className="flex flex-col items-center gap-6">
                    <img src={logo} alt="ASTU" className="h-12 w-auto brightness-200" />
                    <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                        &copy; 2026 ASTU LIBRARY DIRECTORATE | ADAMA, ETHIOPIA
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;