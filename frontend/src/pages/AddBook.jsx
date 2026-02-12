import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  CheckCircle,
  BookPlus,
  AlertCircle,
} from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';

const AddBook = () => {
  const navigate = useNavigate();

  // Form States
  const [file, setFile] = useState(null);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: 'Engineering',
  });

  // Status States
  const [isDeployed, setIsDeployed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleDeploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!file) {
      setError('Please select a PDF file to deploy.');
      setLoading(false);
      return;
    }

    // 1. Prepare FormData
    const formData = new FormData();
    formData.append('title', bookData.title.trim());
    formData.append('author', bookData.author.trim());
    formData.append('category', bookData.category);
    
    // ✅ CRITICAL FIX: Changed from 'bookFile' to 'file' to match backend upload.single('file')
    formData.append('file', file);

    try {
      // 2. Get Admin Token for Authorization
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      if (!token) {
        setError('Authorization failed. Please log in again.');
        return;
      }

      // 3. Send Request
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setIsDeployed(true);
        setTimeout(() => navigate('/admin/inventory'), 2000);
      } else {
        setError(result.message || 'Deployment failed.');
      }
    } catch (err) {
      setError('Connection failed. Is the server on port 5000?');
      console.error('Upload Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AdminNavbar />

      <div className="max-w-3xl mx-auto p-8 md:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Deploy <span className="text-blue-600">Resource</span>
          </h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">
            Upload digital content to the ASTU Cloud
          </p>
        </header>

        {isDeployed ? (
          <div className="bg-emerald-50 border-2 border-emerald-100 p-16 rounded-[4rem] text-center animate-in zoom-in duration-500">
            <CheckCircle size={80} className="mx-auto text-emerald-500 mb-6" />
            <h2 className="text-3xl font-black text-emerald-900 uppercase italic">
              Successfully Deployed
            </h2>
            <p className="text-emerald-600 font-bold mt-2">
              The database and file storage have been updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeploy} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
                <AlertCircle size={20} /> {error}
              </div>
            )}

            {/* Upload Area */}
            <div className="relative group">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`p-16 border-4 border-dashed rounded-[3rem] text-center transition-all ${
                  file
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-100 group-hover:border-blue-200 group-hover:bg-slate-50'
                }`}
              >
                {file ? (
                  <div className="flex flex-col items-center">
                    <FileText size={64} className="text-blue-600 mb-4" />
                    <p className="font-black text-slate-900 italic text-xl">
                      {file.name}
                    </p>
                    <p className="text-blue-400 text-xs font-black uppercase mt-2 tracking-widest">
                      Selected & Ready
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload
                      size={64}
                      className="text-slate-200 mb-4 group-hover:text-blue-400 transition-colors"
                    />
                    <p className="text-slate-500 font-black uppercase italic text-xl">
                      Drag PDF Document Here
                    </p>
                    <p className="text-slate-300 text-xs font-bold mt-2 uppercase tracking-widest">
                      Max File Size: 50MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Book Title"
                required
                value={bookData.title}
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
                className="w-full p-5 bg-white border border-slate-100 rounded-2xl font-bold shadow-sm"
              />

              <input
                type="text"
                placeholder="Author Name"
                required
                value={bookData.author}
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                className="w-full p-5 bg-white border border-slate-100 rounded-2xl font-bold shadow-sm"
              />
            </div>

            <select
              value={bookData.category}
              onChange={(e) =>
                setBookData({ ...bookData, category: e.target.value })
              }
              className="w-full p-5 bg-white border border-slate-100 rounded-2xl font-bold shadow-sm"
            >
              <option>Engineering</option>
              <option>Computing & AI</option>
              <option>Mathematics</option>
              <option>Applied Science</option>
              <option>Business</option>
            </select>

            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-6 rounded-3xl font-black uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${
                loading || !file
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1'
              }`}
            >
              {loading ? 'Uploading to Network...' : <><BookPlus size={24} /> Deploy Now</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddBook;