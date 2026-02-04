import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-hot-toast';
import { PlusCircle, Loader2 } from 'lucide-react';

const AddBookForm = ({ onBookAdded }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        availableCopies: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sends the data to your backend bookRoutes
            const { data } = await API.post('/books', formData);
            toast.success(`${data.title} deployed successfully!`);
            
            // Clear form and refresh the list
            setFormData({ title: '', author: '', isbn: '', availableCopies: 1 });
            if (onBookAdded) onBookAdded(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4 text-blue-900">
                <PlusCircle className="w-5 h-5" />
                <h2 className="text-xl font-bold">Deploy New Book</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input 
                    type="text" placeholder="Book Title" required
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <input 
                    type="text" placeholder="Author Name" required
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
                <input 
                    type="text" placeholder="ISBN (Unique ID)" required
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.isbn}
                    onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                />
                <div className="flex gap-2">
                    <input 
                        type="number" placeholder="Copies" min="1" required
                        className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.availableCopies}
                        onChange={(e) => setFormData({...formData, availableCopies: e.target.value})}
                    />
                    <button 
                        type="submit" disabled={loading}
                        className="flex-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Deploy'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;