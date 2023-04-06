/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import SigninSchema from '../../utils/ValidationSchemas/Signin.schema';
import useAuth from '../../utils/hooks/useAuth';

const SigninForm = () => {
    const [eyeIsClosed, setEyeIsColosed] = useState(true);
    const { signinAccount, firebaseError, setFirebaseError } = useAuth();
    const [inputHighlight, setInputHighlight] = useState(false);
    const navigate = useNavigate();
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SigninSchema,
        onSubmit: (value) => {
            signinAccount(value.email.toLowerCase(), value.password, navigate);
        },
    });

    const inputStyle =
        'w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2';

    return (
        <form
            onSubmit={handleSubmit}
            onChange={() => setFirebaseError('')}
            className="w-full lg:w-3/12 flex flex-col gap-y-5"
        >
            <div className="flex flex-col items-center justify-center gap-y-2 relative">
                <MdOutlineAdminPanelSettings className="text-4xl text-blue-600" />
                <h1 className="text-3xl logo_font">TSAC</h1>
            </div>

            <div className="flex flex-col relative">
                <HiOutlineMail
                    className={
                        firebaseError === 'Wrong email'
                            ? 'absolute top-3 left-3 text-red-600 text-lg'
                            : 'absolute top-3 left-3 text-blue-600 text-lg'
                    }
                />
                <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        firebaseError === 'Wrong email'
                            ? `border-red-600 ${inputStyle}`
                            : inputStyle
                    }
                    type="email"
                    placeholder="Email"
                />
                {errors.email && touched.email && (
                    <p className="text-red-500 pt-1 pl-2">* {errors.email}</p>
                )}
            </div>
            <div className="flex flex-col relative">
                <HiOutlineLockClosed
                    className={
                        firebaseError === 'Wrong password'
                            ? 'absolute top-3 left-3 text-red-600 text-lg'
                            : 'absolute top-3 left-3 text-blue-600 text-lg'
                    }
                />
                <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        firebaseError === 'Wrong passwors'
                            ? `border-red-600 ${inputStyle}`
                            : inputStyle
                    }
                    type={eyeIsClosed ? 'password' : 'text'}
                    placeholder="Password"
                />
                <div
                    onClick={() => setEyeIsColosed(!eyeIsClosed)}
                    className="absolute right-3 top-3 p-1 cursor-pointer"
                >
                    {eyeIsClosed ? <VscEye /> : <VscEyeClosed />}
                </div>
                {errors.password && touched.password && (
                    <p className="text-red-500 pt-1 pl-2">* {errors.password}</p>
                )}
            </div>
            <div>
                {firebaseError && <h1 className="pb-3 pl-2 text-red-600">* {firebaseError}</h1>}
                <button
                    type="submit"
                    className="p-2 w-full border bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Signin
                </button>
            </div>
        </form>
    );
};

export default SigninForm;