import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, BookPlus, AlertCircle } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';

const AddBook = () => {
    const navigate = useNavigate();
    
    // Form States
    const [file, setFile] = useState(null);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        category: 'Engineering',
        description: ''
    });
    
    // Status States
    const [isDeployed, setIsDeployed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(''); // Clear previous errors
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

        // --- BACKEND INTEGRATION: FormData ---
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('category', bookData.category);
        formData.append('description', bookData.description);
        formData.append('bookFile', file); // Matches upload.single('bookFile') in backend

        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                body: formData, // No Content-Type header needed; browser sets it automatically
            });

            const result = await response.json();

            if (response.ok) {
                setIsDeployed(true);
                // Redirect to Admin Dashboard after success
                setTimeout(() => navigate('/admin/dashboard'), 2000);
            } else {
                setError(result.message || 'Deployment failed. Please try again.');
            }
        } catch (err) {
            setError('Server connection failed. Is the backend running?');
            console.error("Upload Error:", err);
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
                        <h2 className="text-3xl font-black text-emerald-900 uppercase italic">Successfully Deployed</h2>
                        <p className="text-emerald-600 font-bold mt-2">The database and file storage have been updated.</p>
                    </div>
                ) : (
                    <form onSubmit={handleDeploy} className="space-y-6">
                        {/* Error Alert */}
                        {error && (
                            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
                                <AlertCircle size={20} /> {error}
                            </div>
                        )}

                        {/* Drag & Drop Upload Area */}
                        <div className="relative group">
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className={`p-16 border-4 border-dashed rounded-[3rem] text-center transition-all ${file ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 group-hover:border-blue-200 group-hover:bg-slate-50'}`}>
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <FileText size={64} className="text-blue-600 mb-4" />
                                        <p className="font-black text-slate-900 italic text-xl">{file.name}</p>
                                        <p className="text-blue-400 text-xs font-black uppercase mt-2 tracking-widest">Selected & Ready</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload size={64} className="text-slate-200 mb-4 group-hover:text-blue-400 transition-colors" />
                                        <p className="text-slate-500 font-black uppercase italic tracking-tight text-xl">Drag PDF Document Here</p>
                                        <p className="text-slate-300 text-xs font-bold mt-2 uppercase tracking-widest">Max File Size: 50MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Book Title</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Enter title"
                                    className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-blue-500/5 font-bold shadow-sm"
                                    onChange={(e) => setBookData({...bookData, title: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Author Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Enter author"
                                    className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-blue-500/5 font-bold shadow-sm"
                                    onChange={(e) => setBookData({...bookData, author: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Category</label>
                            <select 
                                className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm appearance-none"
                                onChange={(e) => setBookData({...bookData, category: e.target.value})}
                            >
                                <option>Engineering</option>
                                <option>Computing & AI</option>
                                <option>Mathematics</option>
                                <option>Applied Science</option>
                                <option>Business</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || !file}
                            className={`w-full py-6 rounded-3xl font-black uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${loading || !file ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 hover:-translate-y-1'}`}
                        >
                            {loading ? (
                                <span className="animate-pulse">Uploading to Network...</span>
                            ) : (
                                <><BookPlus size={24} /> Deploy Now</>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddBook;
