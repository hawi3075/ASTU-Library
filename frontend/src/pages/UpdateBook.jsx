import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import { Upload } from 'lucide-react';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
                setTitle(data.title);
                setAuthor(data.author);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        getBookDetails();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        if (file) formData.append('file', file);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await axios.put(`http://localhost:5000/api/books/${id}`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}` 
                }
            });
            navigate('/admin/inventory');
        } catch (err) {
            alert("Update failed. Check console for details.");
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc]">
            <AdminNavbar />
            <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black italic uppercase text-slate-900 mb-6 text-center">Update Book</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input className="w-full p-4 bg-slate-50 rounded-2xl border" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className="w-full p-4 bg-slate-50 rounded-2xl border" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    
                    <div className="border-2 border-dashed border-slate-200 p-4 rounded-2xl text-center">
                        <label className="cursor-pointer text-blue-600 font-bold text-sm flex items-center justify-center gap-2">
                            <Upload size={18} /> {file ? file.name : "Replace PDF (Optional)"}
                            <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>

                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase italic">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;