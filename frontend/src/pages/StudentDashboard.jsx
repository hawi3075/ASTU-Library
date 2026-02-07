import React, { useState, useMemo } from 'react';
import { Search, Book, Star } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar';

const StudentDashboard = ({ books = [], setBooks }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle Important
  const toggleImportant = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? { ...book, isImportant: !book.isImportant }
          : book
      )
    );
  };

  // Search Filter (Optimized)
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      `${book.title} ${book.author} ${book.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Student <span className="text-blue-600">Hub</span>
          </h1>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search books, authors, categories..."
              className="w-full pl-14 pr-6 py-5 rounded-full bg-white shadow-md focus:shadow-xl outline-none ring-1 ring-slate-200 focus:ring-blue-500 transition-all font-semibold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
            <Book size={16} />
            {searchQuery
              ? `${filteredBooks.length} Results Found`
              : 'Available Books'}
          </h2>
        </div>

        {/* Books Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-white rounded-[2.5rem] p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Important Badge */}
              {book.isImportant && (
                <span className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Important
                </span>
              )}

              {/* Cover */}
              <div className="h-48 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-6 group-hover:from-blue-50 group-hover:to-blue-100 transition-all">
                <Book
                  size={60}
                  className="text-slate-300 group-hover:text-blue-300 group-hover:scale-110 transition-all"
                />
              </div>

              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                  {book.category}
                </span>

                <button
                  aria-label="Mark as important"
                  onClick={() => toggleImportant(book.id)}
                  className="p-2 rounded-full hover:bg-slate-100 active:scale-75 transition"
                >
                  <Star
                    size={22}
                    fill={book.isImportant ? '#facc15' : 'none'}
                    className={
                      book.isImportant
                        ? 'text-yellow-500'
                        : 'text-slate-300'
                    }
                  />
                </button>
              </div>

              {/* Book Info */}
              <h3 className="text-xl font-black uppercase tracking-tight mb-1 leading-snug">
                {book.title}
              </h3>
              <p className="text-sm text-slate-400 font-semibold mb-8">
                By {book.author}
              </p>

              {/* Action */}
              <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200">
                Read Online
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="mt-20 text-center p-16 rounded-[3rem] bg-white border border-dashed border-slate-200 shadow-sm">
            <p className="text-slate-400 font-black uppercase tracking-widest">
              No books match your search
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Try a different keyword 📚
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
