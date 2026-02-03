import axios from 'axios';

const API = axios.create({
    // Matches the PORT defined in your server.js
    baseURL: 'http://localhost:5000/api', 
});

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
    // 1. Get the userInfo string from localStorage
    const storageData = localStorage.getItem('userInfo');
    
    // 2. Parse it if it exists
    const userInfo = storageData ? JSON.parse(storageData) : null;

    // 3. Extract the token and set the Header
    if (userInfo && userInfo.token) {
        req.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    
    return req;
}, (error) => {
    return Promise.reject(error);
});

export default API;