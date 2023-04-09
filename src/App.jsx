import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Shell from './components/Shell/Shell';
import Four0One from './pages/401';
import Four0Four from './pages/404';
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
                    element: <h1>dashboard</h1>,
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
    return (
        <div>
            <AuthProvider>
                <RouterProvider router={router} />;
            </AuthProvider>
        </div>
    );
};

export default App;
