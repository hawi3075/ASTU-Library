import React, { useState } from 'react';
import { Search, Book, Star } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar'; // Import the new shared Navbar

const StudentDashboard = ({ books, setBooks }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // --- LOGIC: Toggle Important Status ---
    const toggleImportant = (id) => {
        setBooks(books.map(book => 
            book.id === id ? { ...book, isImportant: !book.isImportant } : book
        ));
    };

    // --- LOGIC: Search Filter ---
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* INTEGRATED NAVBAR: Replaced old hardcoded nav with the shared component */}
            <StudentNavbar />

            <main className="max-w-7xl mx-auto p-8">
                <header className="mb-12">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
                        Student <span className="text-blue-600">Hub</span>
                    </h1>
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search for books, authors, or categories..." 
                            className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-[2rem] border-none outline-none focus:ring-2 ring-blue-500/20 font-bold transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>

                {/* Book Grid Header */}
                <h2 className="text-xs font-black mb-8 flex items-center gap-2 uppercase italic text-slate-300 tracking-[0.3em]">
                    <Book size={16} /> {searchQuery ? `Found ${filteredBooks.length} results` : "Available Books"}
                </h2>
                
                {/* Book Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBooks.map(book => (
                        <div key={book.id} className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                            {/* Visual Book Cover Placeholder */}
                            <div className="h-48 bg-slate-50 rounded-[2rem] mb-6 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                <Book size={56} className="text-slate-200 group-hover:text-blue-200 transition-colors group-hover:scale-110 transition-transform" />
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                                    {book.category}
                                </span>
                                <button 
                                    onClick={() => toggleImportant(book.id)} 
                                    className="p-2 hover:bg-slate-50 rounded-full transition-all active:scale-75"
                                    title={book.isImportant ? "Remove from Important" : "Mark as Important"}
                                >
                                    <Star 
                                        size={24} 
                                        fill={book.isImportant ? "#eab308" : "none"} 
                                        className={book.isImportant ? "text-yellow-500" : "text-slate-200"} 
                                    />
                                </button>
                            </div>

                            <h3 className="text-xl font-black italic text-slate-800 uppercase tracking-tighter mb-1 leading-tight">
                                {book.title}
                            </h3>
                            <p className="text-slate-400 font-bold text-sm mb-8">
                                By {book.author}
                            </p>

                            <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all uppercase italic tracking-widest text-xs shadow-lg shadow-slate-100 hover:shadow-blue-100">
                                Read Online
                            </button>
                        </div>
                    ))}
                </div>

                {/* Empty State when search has no results */}
                {filteredBooks.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                        <p className="text-slate-400 font-bold italic uppercase tracking-widest">No books found matching your search.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentDashboard;