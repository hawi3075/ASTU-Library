import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Book, ArrowRight, Trash2 } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar';
import AdminNavbar from '../components/AdminNavbar';
import API from '../services/api'; // Ensure API is imported for database sync

const ImportantBooks = ({ books = [], setBooks, currentUser }) => {
    const navigate = useNavigate();
    
    const user = currentUser || JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = user?.role === 'admin' || user?.isAdmin;

    // 1. Logic to filter books marked as important
    const savedBooks = books.filter(book => book.isImportant === true);

    // 2. Persistent Remove Handler (Syncs with MongoDB)
    const handleRemoveFromCollection = async (id) => {
        if (window.confirm("Remove this from your collection?")) {
            try {
                // Optimistic UI update
                setBooks(prevBooks => 
                    prevBooks.map(book => 
                        book._id === id ? { ...book, isImportant: false } : book
                    )
                );

                // Sync change to database
                await API.patch(`/books/${id}/toggle-favorite`);
            } catch (err) {
                console.error("Failed to remove book:", err);
                alert("Session error: Could not update collection on server.");
                
                // Optional: Re-fetch books to revert UI on error
                const { data } = await API.get('/books');
                setBooks(data);
            }
        }
    };

    // 3. Functional PDF Opener (Fixes about:blank#blocked)
    const openPdf = (pdfUrl) => {
        if (!pdfUrl) return alert("PDF link not found.");
        const fullUrl = `http://localhost:5000${pdfUrl}`;
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">
                    Please Login to View Collections
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {isAdmin ? <AdminNavbar /> : <StudentNavbar />}

            <main className="max-w-6xl mx-auto p-8 pt-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-4">
                        <Bookmark size={48} className="text-blue-600" />
                        My Collection
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-4">
                        Saved Resources & Important Research Materials
                    </p>
                </div>

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
                                    {/* ✅ FIXED READ LINK */}
                                    <button 
                                        onClick={() => openPdf(book.pdfUrl || book.fileUrl)}
                                        className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all"
                                    >
                                        Read Now <ArrowRight size={14} />
                                    </button>

                                    <button 
                                        onClick={() => handleRemoveFromCollection(book._id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                                        title="Remove from collection"
                                    >
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