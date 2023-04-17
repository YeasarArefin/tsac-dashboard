import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return <Spinner />;
    }

    if (user && user.uid) {
        return children;
    }

    return <Navigate to="/signin" state={{ from: location }} />;
};

export default RequireAuth;
