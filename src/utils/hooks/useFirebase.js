/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import firebaseInit from '../firebase/firebase.init';

firebaseInit();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [firebaseError, setFirebaseError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const auth = getAuth();

    // account sign out function
    const signOutAccount = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .catch((error) => {
                setFirebaseError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    // getting user important information
    /* const getUserInfo = async (currentUser, navigate) => {
        const { data, status } = await axios.get(
            `https://tsac.onrender.com/api/v1/accounts?email=${currentUser?.email}`,
            { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );
        setUserInfo(data?.[0]);
        setIsLoading(false);
        const userRole = data?.[0]?.role;
        if (userRole === 'admin') {
            navigate('/');
        } else if (userRole === 'teacher') {
            navigate('/teachers');
        } else if (userRole === 'student') {
            navigate('/');
        }
    }; */

    const getUserInfo = async (currentUser, navigate) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const { data, status } = await axios.get(
                `https://tsac.onrender.com/api/v1/accounts?email=${currentUser?.email}`,
                { headers: { authorization: `Bearer ${accessToken}` } }
            );
            console.log('🚀 ~ file: useFirebase.js:62 ~ getUserInfo ~ status:', status);

            setUserInfo(data?.[0]);
            setIsLoading(false);
            const userRole = data?.[0]?.role;

            if (userRole === 'admin') {
                navigate('/');
            } else if (userRole === 'teacher') {
                navigate('/teachers');
            } else if (userRole === 'student') {
                navigate('/');
            }
        } catch (error) {
            // Check if the error indicates an expired access token
            if (error.response && error.response.status === 401) {
                try {
                    // Call the refresh token endpoint to get a new access token
                    const refreshToken = localStorage.getItem('refreshToken');
                    const refreshResponse = await axios.post(
                        'https://tsac.onrender.com/api/v1/jwt/refresh',
                        { refreshToken }
                    );

                    if (refreshResponse.status === 200) {
                        const { accessToken } = refreshResponse.data;

                        // Update the access token in the localStorage
                        localStorage.setItem('accessToken', accessToken);

                        // Retry the original getUserInfo request with the new access token
                        const newAccessToken = localStorage.getItem('accessToken');
                        const { data, status } = await axios.get(
                            `https://tsac.onrender.com/api/v1/accounts?email=${currentUser?.email}`,
                            { headers: { authorization: `Bearer ${newAccessToken}` } }
                        );
                        console.log('🚀 ~ file: useFirebase.js:62 ~ getUserInfo ~ status:', status);

                        setUserInfo(data?.[0]);
                        setIsLoading(false);
                        const userRole = data?.[0]?.role;

                        if (userRole === 'admin') {
                            navigate('/');
                        } else if (userRole === 'teacher') {
                            navigate('/teachers');
                        } else if (userRole === 'student') {
                            navigate('/');
                        }
                    }
                } catch (error) {
                    console.log('🚀 ~ file: useFirebase.js:123 ~ getUserInfo ~ error:', error);
                    if (error.response.status === 401) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                    }
                }
            }
        }
    };

    const createAccount = (email, password, userInfo) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                if (user) {
                    axios
                        .post('https://tsac.onrender.com/api/v1/accounts', userInfo)
                        .then((res) => {
                            if (res.status === 200) {
                                setUser(user);
                                getUserInfo(user);
                                toast.success('Account Created Successfully', {
                                    position: 'bottom-right',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'light',
                                });
                            }
                        });
                }
            })
            .catch((error) => {
                setFirebaseError(error.message);
            });
    };

    // account sing in function
    const signinAccount = (email, password, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                axios
                    .post('https://tsac.onrender.com/api/v1/jwt', { email: user.email })
                    .then(({ data }) => {
                        const { accessToken, refreshToken } = data;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                        setUser(user);
                        getUserInfo(user, navigate);
                    });
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    setFirebaseError('Wrong password');
                } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    setFirebaseError('Wrong email');
                } else {
                    setFirebaseError(error.message);
                }
            })
            .finally(() => setIsLoading(false));
    };

    // checking auth state
    useEffect(() => {
        setIsLoading(true);
        const subscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getUserInfo(user);
            } else {
                setUser({});
                setIsLoading(false);
            }
        });
        setPersistence(auth, browserSessionPersistence);
        return () => subscribed;
    }, [auth]);

    return {
        user,
        userInfo,
        firebaseError,
        setFirebaseError,
        isLoading,
        createAccount,
        signinAccount,
        signOutAccount,
        signOut,
        auth,
    };
};
export default useFirebase;
