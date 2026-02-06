import React, { useState } from 'react';
import { Search, Book, Star, Clock, Bookmark, User } from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const StudentDashboard = () => {
    // Sample state for books (In a real app, this comes from your Admin's "Deploy")
    const [books, setBooks] = useState([
        { id: 1, title: "Quantum Mechanics", author: "Griffiths", category: "Physics", isImportant: false },
        { id: 2, title: "Data Structures", author: "Mark Allen", category: "CS", isImportant: false },
        { id: 3, title: "Thermodynamics", author: "Cengel", category: "Mechanical", isImportant: false },
    ]);

    const toggleImportant = (id) => {
        setBooks(books.map(book => 
            book.id === id ? { ...book, isImportant: !book.isImportant } : book
        ));
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Top Navigation */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <img src={logo} alt="ASTU" className="h-10" />
                <div className="flex items-center gap-6">
                    <button className="font-bold text-blue-600">Library</button>
                    <button className="font-bold text-slate-400 hover:text-blue-600 transition-colors">My Collection</button>
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                        <User size={20} className="text-slate-600" />
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Student <span className="text-blue-600">Hub</span></h1>
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input type="text" placeholder="Search for books, research papers, or authors..." className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500/20" />
                    </div>
                </header>

                {/* Book Grid */}
                <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase italic text-slate-400 tracking-widest">
                    <Book size={20} /> Available Books
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map(book => (
                        <div key={book.id} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                            <div className="h-48 bg-blue-50 rounded-[1.5rem] mb-6 flex items-center justify-center">
                                <Book size={48} className="text-blue-200 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {book.category}
                                </span>
                                <button onClick={() => toggleImportant(book.id)} className="transition-transform active:scale-75">
                                    <Star size={24} fill={book.isImportant ? "#eab308" : "none"} className={book.isImportant ? "text-yellow-500" : "text-slate-300"} />
                                </button>
                            </div>
                            <h3 className="text-xl font-black italic text-slate-800 mb-1">{book.title}</h3>
                            <p className="text-slate-400 font-bold text-sm mb-6">{book.author}</p>
                            <button className="w-full py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-blue-600 transition-colors uppercase italic text-sm">
                                Read Online
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;