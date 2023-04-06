import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400" />
            </div>
        );
    }

    if (user && user.uid) {
        return children;
    }

    return <Navigate to="/signin" state={{ from: location }} />;
};

export default RequireAuth;
