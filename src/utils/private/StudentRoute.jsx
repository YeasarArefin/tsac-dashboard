import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const StudentRoute = ({ children }) => {
    const { user, isLoading, userInfo } = useAuth();
    const [roleChecking, setRoleChecking] = useState(true);
    const location = useLocation();

    setTimeout(() => {
        setRoleChecking(false);
    }, 500);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400" />
            </div>
        );
    }

    if (roleChecking) {
        return <h1>loading...</h1>;
    }

    if (user?.uid && userInfo?.role === 'student') {
        return children;
    }
    return <Navigate to="/unauthorized" state={{ from: location }} />;
};

export default StudentRoute;
