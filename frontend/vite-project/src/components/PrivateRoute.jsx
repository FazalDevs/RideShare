import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("jwt");

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, allow access
    return children;
};

export default PrivateRoute;
