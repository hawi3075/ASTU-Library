import axios from 'axios';

const API = axios.create({
    // Matches the PORT defined in your server.js
    baseURL: 'http://localhost:5000/api', 
});

// --- 1. REQUEST INTERCEPTOR ---
// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
    const storageData = localStorage.getItem('userInfo');
    const userInfo = storageData ? JSON.parse(storageData) : null;

    if (userInfo && userInfo.token) {
        req.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    
    return req;
}, (error) => {
    return Promise.reject(error);
});

// --- 2. RESPONSE INTERCEPTOR (NEW) ---
// This handles errors globally so you don't get "next is not a function"
API.interceptors.response.use(
    (response) => response, // Return the response if successful
    (error) => {
        // If the error has a message from the backend, use it
        const message = error.response?.data?.message || "Something went wrong with the server";
        
        // Log the error for debugging
        console.error("API Error:", message);
        
        // Return a structured error that your frontend can read
        return Promise.reject(error);
    }
);

export default API;