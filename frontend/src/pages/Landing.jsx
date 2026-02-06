import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ShieldCheck, Globe, Mail, Phone, MapPin, Building2, 
    ChevronRight, Zap, Atom, Sigma, Cpu, FlaskConical 
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
            tag: "Engineering" 
        },
        { 
            title: "Applied Mathematics", 
            author: "K.A. Stroud", 
            icon: <Sigma className="w-16 h-16 text-white/90" />, 
            gradient: "from-emerald-600 to-teal-500",
            tag: "Mathematics" 
        },
        { 
            title: "Digital Logic Design", 
            author: "M. Morris Mano", 
            icon: <Cpu className="w-16 h-16 text-white/90" />, 
            gradient: "from-orange-500 to-amber-500",
            tag: "Computing" 
        },
        { 
            title: "University Chemistry", 
            author: "Raymond Chang", 
            icon: <FlaskConical className="w-16 h-16 text-white/90" />, 
            gradient: "from-rose-600 to-red-500",
            tag: "Science" 
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100">
            {/* --- Hero Section --- */}
            <header className="relative bg-[#1e40af] py-20 px-6 text-white text-center overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <img src={logo} alt="ASTU" className="h-28 w-auto mx-auto mb-8 drop-shadow-2xl" />
                    
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-lg uppercase italic">
                        ASTU <span className="text-blue-300">Digital</span> Library
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-14 font-medium tracking-wide opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Empowering Adama Science and Technology University with <span className="underline decoration-blue-400 underline-offset-4">innovative knowledge</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button 
                            onClick={() => navigate('/login')}
                            className="group px-14 py-5 bg-white text-blue-800 font-black rounded-2xl shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                            SIGN IN 
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                        
                        <button 
                            onClick={() => navigate('/register')}
                            className="group flex items-center justify-center gap-3 px-14 py-5 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white/10 transition-all shadow-xl cursor-pointer"
                        >
                            <Zap className="w-6 h-6 text-yellow-400" />
                            JOIN NOW
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Globe className="absolute -bottom-20 -right-20 w-96 h-96 animate-[spin_20s_linear_infinite]" />
                </div>
            </header>

            {/* --- Book Collection Showcase --- */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-16 w-3 bg-blue-600 rounded-full"></div>
                        <div>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Academic Core</h2>
                            <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mt-1">Direct Access to Premium Resources</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {collectionPreview.map((book, idx) => (
                            <div key={idx} className="group bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-5 hover:-translate-y-4 transition-all duration-500 cursor-pointer">
                                <div className={`relative bg-gradient-to-br ${book.gradient} aspect-[3/4.2] rounded-[2.5rem] mb-8 shadow-inner overflow-hidden flex flex-col items-center justify-center`}>
                                    <div className="relative z-10 p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                        {book.icon}
                                    </div>
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/30 backdrop-blur-md text-[10px] font-black text-white rounded-full uppercase tracking-widest">
                                        {book.tag}
                                    </div>
                                </div>
                                <div className="px-3 pb-4">
                                    <h4 className="font-black text-slate-800 text-xl leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                                        {book.title}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- University Contacts Section --- */}
            <section className="py-24 px-6 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* International Relations Office */}
                        <div className="p-12 rounded-[4rem] bg-blue-50 border-2 border-blue-100 group hover:bg-[#1e40af] transition-all duration-700 cursor-default shadow-sm hover:shadow-blue-200">
                            <Building2 className="w-14 h-14 text-blue-600 mb-8 group-hover:text-white group-hover:rotate-6 transition-all" />
                            <h3 className="text-3xl font-black text-slate-900 group-hover:text-white mb-8 tracking-tighter transition-colors">
                                International <br/>Relations Office
                            </h3>
                            <div className="space-y-5 text-slate-600 group-hover:text-blue-50 font-semibold transition-colors">
                                <p className="flex items-center gap-4 hover:translate-x-2 transition-transform"><Phone className="w-6 h-6 text-blue-500 group-hover:text-blue-200"/> +251-22-211-3961</p>
                                <p className="flex items-center gap-4 hover:translate-x-2 transition-transform"><Mail className="w-6 h-6 text-blue-500 group-hover:text-blue-200"/> irccd@astu.edu.et</p>
                                <p className="flex items-center gap-4 hover:translate-x-2 transition-transform"><MapPin className="w-6 h-6 text-blue-500 group-hover:text-blue-200"/> P.O.Box: 1888 Adama, Ethiopia</p>
                            </div>
                        </div>

                        {/* Office of Registrar */}
                        <div className="p-12 rounded-[4rem] bg-slate-50 border-2 border-slate-100 group hover:bg-slate-900 transition-all duration-700 cursor-default shadow-sm hover:shadow-xl">
                            <ShieldCheck className="w-14 h-14 text-red-600 mb-8 group-hover:text-red-400 group-hover:-rotate-6 transition-all" />
                            <h3 className="text-3xl font-black text-slate-900 group-hover:text-white mb-8 tracking-tighter transition-colors">
                                Office of <br/>the Registrar
                            </h3>
                            <div className="space-y-5 text-slate-600 group-hover:text-slate-300 font-bold transition-colors">
                                <p className="flex items-center gap-4 hover:translate-x-2 transition-transform"><Phone className="w-6 h-6 text-slate-400"/> +251-221-100001</p>
                                <p className="flex items-center gap-4 hover:translate-x-2 transition-transform"><Mail className="w-6 h-6 text-slate-400"/> sar@astu.edu.et</p>
                                <p className="bg-slate-200 group-hover:bg-white/10 py-3 px-6 rounded-2xl text-center text-sm tracking-widest">VERIFIED ACADEMIC PORTAL</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Professional Footer --- */}
            <footer className="py-16 bg-slate-900 text-white text-center">
                <div className="flex flex-col items-center gap-8">
                    <img src={logo} alt="ASTU" className="h-16 w-auto brightness-200 grayscale opacity-50" />
                    <div className="w-32 h-1.5 bg-blue-600 rounded-full"></div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-[0.5em]">
                        &copy; 2026 ASTU LIBRARY DIRECTORATE
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;