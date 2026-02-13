import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, BookOpen, User, Tag, CheckCircle2 } from 'lucide-react';
import logo from '../assets/LOGO 2.PNG';

const AddBook = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError("Only PDF files are allowed.");
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    }
  };

  const handleDeploy = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Get Token from Storage
    const savedUser = JSON.parse(localStorage.getItem('userInfo'));
    const token = savedUser?.token;

    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    
    // 2. Prepare Multi-part Form Data
    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('author', author.trim());
    formData.append('category', category);
    formData.append('file', file); 

    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          // 3. Attach Authorization Header
          'Authorization': `Bearer ${token}`
        },
        // IMPORTANT: No 'Content-Type' header here for FormData uploads
        body: formData, 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success: Book Deployed!");
        navigate('/admin/dashboard'); 
      } else {
        // Capture 500 or 401/403 errors from backend
        setError(data.message || `Error ${response.status}: Deployment failed.`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server unreachable. Check your backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ASTU Logo" className="h-8 w-auto" />
          <span className="font-black text-blue-900 uppercase italic tracking-tighter">Astu Admin</span>
        </div>
        <button onClick={handleLogout} className="text-slate-400 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest transition-colors">
          Sign Out
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent">
        <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          
          <div className="p-8 border-b border-slate-50 bg-blue-50/30 text-center">
            <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tight">Deploy New Resource</h2>
            <p className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase mt-1">Librarian Upload Portal</p>
          </div>

          <form onSubmit={handleDeploy} className="p-10 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-pulse">
                ⚠️ {error}
              </div>
            )}

            <div className="relative group">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${file ? 'border-blue-500 bg-blue-50' : 'border-slate-200 group-hover:border-blue-300'}`}>
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="text-blue-600" size={32} />
                    <p className="text-sm font-bold text-blue-900 truncate max-w-[250px]">{fileName}</p>
                    <span className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Selected & Ready</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-slate-300" size={32} />
                    <p className="text-sm font-bold text-slate-500">Click to upload PDF resource</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Book Title</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Formal Methods Lecture" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Author Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                  <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Instructor Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-medium appearance-none">
                    <option value="Engineering">Engineering</option>
                    <option value="Computing">Computing</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase italic tracking-widest text-xs mt-4 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-blue-500/20'}`}>
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Deploy Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;