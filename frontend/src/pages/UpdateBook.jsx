import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const getBookDetails = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
            setTitle(data.title);
            setAuthor(data.author);
        };
        getBookDetails();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            await axios.put(`http://localhost:5000/api/books/${id}`, 
                { title, author },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/admin/inventory');
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc]">
            <AdminNavbar />
            <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black italic uppercase text-slate-900 mb-6 text-center">Update Book</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input 
                        className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Book Title"
                    />
                    <input 
                        className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100"
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        placeholder="Author"
                    />
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase italic">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;