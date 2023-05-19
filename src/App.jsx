import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shell from './components/Shell/Shell';
import Four0One from './pages/401';
import Four0Four from './pages/404';
import CreateInvoice from './pages/CreateInvoice';
import Dashboard from './pages/Dashboard';
import ListInvoice from './pages/ListInvoice';
import Settings from './pages/Settings/Settings';
import Signin from './pages/Signin/Signin';
import StudentsList from './pages/Students/StudentsList';
import TeachersList from './pages/Teachers/TeachersList';
import AuthProvider from './utils/context/AuthProvider';
import RequireAuth from './utils/private/RequireAuth';
import RolebasedAuth from './utils/private/RolebasedAuth';

const App = () => {
    const { admin, teacher, student } = {
        admin: 'admin',
        teacher: 'teacher',
        student: 'student',
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <RequireAuth>
                    <Shell />
                </RequireAuth>
            ),
            children: [
                {
                    path: '/',
                    element: <Dashboard />,
                },
                {
                    path: 'teachers',
                    element: (
                        <RolebasedAuth allowedRoles={[admin, teacher]}>
                            <TeachersList />
                        </RolebasedAuth>
                    ),
                    loader: async () =>
                        fetch('https://tsac.onrender.com/api/v1/accounts?role=teacher'),
                },
                {
                    path: 'students',
                    element: (
                        <RolebasedAuth allowedRoles={[admin, teacher]}>
                            <StudentsList />
                        </RolebasedAuth>
                    ),
                    loader: async () =>
                        fetch('https://tsac.onrender.com/api/v1/accounts?role=student'),
                },
                {
                    path: 'create-invoice',
                    element: (
                        <RolebasedAuth allowedRoles={[admin]}>
                            <CreateInvoice />
                        </RolebasedAuth>
                    ),
                },
                {
                    path: 'create-expenditure',
                    element: (
                        <RolebasedAuth allowedRoles={[admin]}>
                            <h1>create-expenditure</h1>
                        </RolebasedAuth>
                    ),
                },
                {
                    path: 'list-invoice',
                    element: (
                        <RolebasedAuth allowedRoles={[admin]}>
                            <ListInvoice />
                        </RolebasedAuth>
                    ),
                    loader: async () => fetch('http://localhost:5000/api/v1/invoice'),
                },
                {
                    path: 'list-expenditure',
                    element: (
                        <RolebasedAuth allowedRoles={[admin]}>
                            <h1>list-expenditure</h1>
                        </RolebasedAuth>
                    ),
                    loader: async () => fetch('http://localhost:5000/api/v1/invoice'),
                },
                {
                    path: 'settings',
                    element: (
                        <RolebasedAuth allowedRoles={[admin]}>
                            <Settings />
                        </RolebasedAuth>
                    ),
                },
            ],
        },
        {
            path: 'signin',
            element: <Signin />,
        },
        {
            path: 'unauthorized',
            element: <Four0One />,
        },
        {
            path: '*',
            element: <Four0Four />,
        },
    ]);

    const theme = createTheme({
        typography: {
            fontFamily: ['Mulish'].join(','),
        },
    });
    return (
        <div>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
