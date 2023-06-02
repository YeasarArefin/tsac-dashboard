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
                localStorage.removeItem('token');
            })
            .catch((error) => {
                setFirebaseError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    // getting user important information
    const getUserInfo = async (currentUser, navigate) => {
        const { data, status } = await axios.get(
            `https://tsac.onrender.com/api/v1/accounts?email=${currentUser?.email}`,
            { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
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
                        const { token } = data;
                        localStorage.setItem('token', token);
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
    };
};
export default useFirebase;
