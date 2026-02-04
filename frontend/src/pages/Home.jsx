import React, { useState } from 'react';
import API from '../services/api';
import { PlusCircle, Users, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Librarian Control Panel</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg">
                    <PlusCircle className="mb-2" />
                    <h2 className="text-xl font-bold">Deploy Book</h2>
                    <p className="text-sm opacity-80">Add new resources to the library</p>
                </div>
                <div className="bg-green-600 p-6 rounded-xl text-white shadow-lg">
                    <Users className="mb-2" />
                    <h2 className="text-xl font-bold">Control Users</h2>
                    <p className="text-sm opacity-80">Manage student access and IDs</p>
                </div>
                <div className="bg-purple-600 p-6 rounded-xl text-white shadow-lg">
                    <BookOpen className="mb-2" />
                    <h2 className="text-xl font-bold">Transactions</h2>
                    <p className="text-sm opacity-80">See who has accessed books</p>
                </div>
            </div>

            {/* Form to Add New Book would go here */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Add New Book to ASTU Collection</h3>
                {/* Form Inputs for Title, Author, ISBN, Copies */}
            </div>
        </div>
    );
};

export default AdminDashboard;