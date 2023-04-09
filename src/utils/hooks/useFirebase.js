/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
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
    const [isLoading, setisLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const auth = getAuth();

    const getUserInfo = async (currentUser, navigate) => {
        const { data } = await axios.get(
            `https://tsac.onrender.com/api/v1/accounts?email=${currentUser?.email}`
        );
        setUserInfo(data?.[0]);
        setisLoading(false);
        const userRole = data?.[0]?.role;
        if (userRole === 'admin') {
            navigate('/settings');
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

    const signinAccount = (email, password, navigate) => {
        setisLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                setUser(user);
                getUserInfo(user, navigate);
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
            .finally(() => setisLoading(false));
    };

    const signOutAccount = () => {
        setisLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .catch((error) => {
                setFirebaseError(error.message);
            })
            .finally(() => setisLoading(false));
    };

    useEffect(() => {
        setisLoading(true);
        const subscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getUserInfo(user);
            } else {
                setUser({});
                setisLoading(false);
            }
        });

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
