import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if user info exists in localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // If userInfo (and the token) exists, allow them to see the page (Outlet)
    // If not, redirect them back to the login page
    return userInfo && userInfo.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;