import React from 'react';
import { Star, ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImportantBooks = ({ books }) => {
    const navigate = useNavigate();
    // Filter to get only starred books
    const starredBooks = books.filter(b => b.isImportant);

    return (
        <div className="min-h-screen bg-white p-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs mb-8">
                <ArrowLeft size={16} /> Back to Library
            </button>
            
            <h1 className="text-5xl font-black italic uppercase text-slate-900 mb-12">
                My <span className="text-yellow-500">Important</span> Collection
            </h1>

            {starredBooks.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <Star size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold">Your collection is empty. Star a book to see it here!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {starredBooks.map(book => (
                        <div key={book.id} className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                            <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <BookOpen className="text-blue-600" size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-lg">{book.title}</h3>
                                <p className="text-slate-400 font-bold text-sm">{book.author}</p>
                            </div>
                            <button className="p-4 bg-yellow-50 text-yellow-600 rounded-full">
                                <Star fill="currentColor" size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImportantBooks;