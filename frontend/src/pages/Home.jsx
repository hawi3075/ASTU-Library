import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Search, BookOpen } from 'lucide-react';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await API.get('/books');
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books", error);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-blue-900">ASTU Digital Library</h1>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search for books..." 
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                    <div key={book._id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                        <div className="bg-blue-50 h-40 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen className="w-12 h-12 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{book.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${book.availableCopies > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Out of Stock'}
                            </span>
                            <button className="text-blue-600 font-semibold text-sm hover:underline">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;