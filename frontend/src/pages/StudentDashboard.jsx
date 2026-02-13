import React, { useState, useMemo, useEffect } from 'react';
import { Search, Book, Star, ExternalLink, Loader2 } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar';
import API from '../services/api';

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch real books from MongoDB
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await API.get('/books');
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 2. Persistent Toggle (Fixes the "Session Error" by hitting the right endpoint)
  const toggleCollection = async (id) => {
    // Save previous state for rollback if server fails
    const previousBooks = [...books];

    try {
      // Optimistic UI update: change the star immediately for a smooth feel
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, isImportant: !book.isImportant } : book
        )
      );

      // IMPORTANT: This must match your backend route exactly!
      await API.patch(`/books/${id}/toggle-favorite`);
      
    } catch (err) {
      console.error("Failed to sync favorite status:", err);
      setBooks(previousBooks); // Rollback UI
      alert("Session error: Backend route not found or server offline.");
    }
  };

  // 3. Search Filter (Optimized)
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      `${book.title} ${book.author} ${book.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <div className="uppercase font-black text-blue-600 italic tracking-widest">
        Syncing ASTU Repository...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Knowledge Repository</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 italic uppercase">
            Student <span className="text-blue-600">Hub</span>
          </h1>

          <div className="relative max-w-2xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
            <input
              type="text"
              placeholder="Search engineering, science, or math..."
              className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 focus:shadow-blue-100 outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div key={book._id} className="group relative bg-white rounded-[3rem] p-8 border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="h-56 rounded-[2.5rem] bg-slate-50 overflow-hidden flex items-center justify-center mb-8 relative group-hover:bg-blue-600 transition-colors duration-500">
                 <Book size={80} className="text-slate-200 group-hover:text-blue-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />
              </div>

              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-5 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {book.category}
                </span>

                <button
                  onClick={() => toggleCollection(book._id)}
                  className={`p-3 rounded-2xl transition-all active:scale-90 ${
                    book.isImportant ? 'bg-yellow-50 text-yellow-500' : 'bg-slate-50 text-slate-300 hover:text-yellow-500'
                  }`}
                >
                  <Star size={24} fill={book.isImportant ? '#facc15' : 'none'} />
                </button>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic text-slate-800 leading-tight">
                {book.title}
              </h3>
              <p className="text-sm text-slate-400 font-bold mb-10 tracking-wide uppercase">By {book.author}</p>

              <button 
                onClick={() => window.open(`http://localhost:5000${book.pdfUrl || book.fileUrl}`, '_blank')}
                className="flex items-center justify-center gap-3 w-full py-5 rounded-[1.5rem] bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl"
              >
                <ExternalLink size={16} /> Read Online
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;