import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { Edit, Trash2, Book } from 'lucide-react';

const Inventory = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/books');
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteBook = async (id) => {
        if (window.confirm("Delete this book permanently?")) {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo')).token;
                await axios.delete(`http://localhost:5000/api/books/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBooks(books.filter(book => book._id !== id));
            } catch (err) {
                alert("Failed to delete book");
            }
        }
    };

    if (loading) return <div className="p-20 text-center font-black italic">LOADING INVENTORY...</div>;

    return (
        <div className="min-h-screen bg-[#fcfcfc]">
            <AdminNavbar />
            <main className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-black italic uppercase mb-10 text-slate-900">
                    Book <span className="text-blue-600">Inventory</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                                    <Book size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 uppercase text-sm">{book.title}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase">{book.author}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => navigate(`/admin/update-book/${book._id}`)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                >
                                    <Edit size={20} />
                                </button>
                                <button 
                                    onClick={() => deleteBook(book._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Inventory;