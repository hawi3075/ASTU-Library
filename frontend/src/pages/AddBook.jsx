import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, BookPlus, FileText, CheckCircle, ChevronLeft } from 'lucide-react';

const AddBook = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [isDeployed, setIsDeployed] = useState(false);

    // Form State
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        category: 'Engineering',
        description: ''
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDeploy = (e) => {
        e.preventDefault();
        // Here you would normally send the data to a backend (Node.js/Firebase)
        console.log("Deploying:", { ...bookData, file });
        
        setIsDeployed(true);
        setTimeout(() => {
            navigate('/admin/dashboard'); // Go back to admin dashboard after success
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12 font-sans">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs mb-8 hover:text-blue-600 transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Dashboard
                </button>

                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">
                    Deploy <span className="text-blue-600">New Resource</span>
                </h1>
                <p className="text-slate-500 font-medium mb-10">Upload digital textbooks and research papers to the ASTU network.</p>

                {isDeployed ? (
                    <div className="bg-emerald-50 border-2 border-emerald-100 p-12 rounded-[3rem] text-center animate-in fade-in zoom-in duration-500">
                        <CheckCircle size={64} className="mx-auto text-emerald-500 mb-4" />
                        <h2 className="text-2xl font-black text-emerald-900 uppercase italic">Successfully Deployed!</h2>
                        <p className="text-emerald-700 font-bold mt-2">The book is now available for students.</p>
                    </div>
                ) : (
                    <form onSubmit={handleDeploy} className="space-y-8">
                        {/* File Upload Area */}
                        <div className="relative group">
                            <input 
                                type="file" 
                                accept=".pdf,.epub" 
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className={`p-12 border-4 border-dashed rounded-[3rem] text-center transition-all ${file ? 'border-blue-600 bg-blue-50' : 'border-slate-100 group-hover:border-blue-200 group-hover:bg-slate-50'}`}>
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <FileText size={48} className="text-blue-600 mb-2" />
                                        <p className="font-black text-blue-900 italic">{file.name}</p>
                                        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1">Ready to upload</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload size={48} className="text-slate-300 mb-4 group-hover:text-blue-400 transition-colors" />
                                        <p className="text-slate-500 font-black uppercase italic tracking-tight">Click or Drag PDF here</p>
                                        <p className="text-slate-300 text-xs font-bold mt-2">Max file size: 50MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Text Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Book Title</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. Engineering Circuit Analysis"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-bold"
                                    onChange={(e) => setBookData({...bookData, title: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Author</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. William Hayt"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 font-bold"
                                    onChange={(e) => setBookData({...bookData, author: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Category</label>
                            <select 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none appearance-none font-bold text-slate-700"
                                onChange={(e) => setBookData({...bookData, category: e.target.value})}
                            >
                                <option>Engineering</option>
                                <option>Computing & AI</option>
                                <option>Mathematics</option>
                                <option>Applied Science</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            disabled={!file}
                            className={`w-full py-6 rounded-3xl font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${file ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                        >
                            <BookPlus size={24} /> Deploy to Library
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddBook;