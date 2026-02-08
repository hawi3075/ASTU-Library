import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Book, ArrowRight, Trash2 } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar'; // Import the Navbar
import AdminNavbar from '../components/AdminNavbar';

const ImportantBooks = ({ books, currentUser }) => {
    const navigate = useNavigate();
    
    // Safety session recovery
    const user = currentUser || JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    // Filter books that are marked as important/saved
    // (Assuming you have an 'isImportant' property or similar logic)
    const savedBooks = books.filter(book => book.isImportant === true);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
                    Please Login to View Collections
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* 1. Added the Navbar here */}
            {isAdmin ? <AdminNavbar /> : <StudentNavbar />}

            <main className="max-w-6xl mx-auto p-8 pt-12">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-4">
                        <Bookmark size={48} className="text-blue-600" />
                        My Collection
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-4">
                        Saved Resources & Important Research Materials
                    </p>
                </div>

                {/* Books Grid */}
                {savedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {savedBooks.map((book) => (
                            <div key={book._id} className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                                    <Book size={24} />
                                </div>
                                <h3 className="text-xl font-black uppercase italic leading-tight mb-2 truncate">
                                    {book.title}
                                </h3>
                                <p className="text-slate-500 font-medium text-sm mb-6">
                                    {book.author}
                                </p>
                                <div className="flex items-center justify-between">
                                    <button className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
                                        Read Now <ArrowRight size={14} />
                                    </button>
                                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-50 rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                        <Bookmark size={64} className="mx-auto text-slate-200 mb-6" />
                        <h2 className="text-2xl font-black uppercase italic text-slate-400">Your collection is empty</h2>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="mt-6 text-blue-600 font-black uppercase text-xs tracking-widest hover:underline"
                        >
                            Explore Library
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ImportantBooks;