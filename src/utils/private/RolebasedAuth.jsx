import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RolebasedAuth = ({ children, allowedRoles }) => {
    const { user, isLoading, userInfo } = useAuth();
    const location = useLocation();
    const userRole = [userInfo?.role];
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400" />
            </div>
        );
    }

    if (user && user.uid && userRole.find((role) => allowedRoles?.includes(role))) {
        return children;
    }

    return <Navigate to="/unauthorized" state={{ from: location }} />;
};

export default RolebasedAuth;
