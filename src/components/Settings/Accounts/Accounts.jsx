/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountSchema from '../../../utils/ValidationSchemas/Accounts.schema';
import useAuth from '../../../utils/hooks/useAuth';

const Accounts = () => {
    const { createAccount, user, firebaseError, setFirebaseError } = useAuth();
    const nameRef = useRef('');
    const phoneRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [eyeIsClosed, setEyeIsColosed] = useState(true);
    const [studentStandard, setStudentStandard] = useState('');
    const [teacherStandard, setTeacherStandard] = useState([]);
    const [saveLoading, setSaveLoading] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: '',
        standard: [],
    });

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: AccountSchema,

            onSubmit: (value, action) => {
                // createAccount(values.email, values.password, values, navigate);
                setSaveLoading(true);
                axios.post('http://localhost:5000/api/v1/createaccount', value).then((res) => {
                    if (res.status === 200) {
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
                        action.resetForm();
                        setSaveLoading(false);
                    }
                });
            },
        });

    const inputStyle =
        'w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2';

    const handleStudentStandardChange = (e) => {
        const newInitValue = values;
        newInitValue.standard = [e.target.value];

        console.log(
            '🚀 ~ file: Accounts.jsx:65 ~ handleStandardChange ~ newInitValue:',
            newInitValue
        );
        setInitialValues(newInitValue);
        setStudentStandard(e.target.value);
    };

    const handleTeacherStanderdChange = () => {
        const newInitValue = { ...initialValues };
        setInitialValues(newInitValue);
        console.log(newInitValue);
    };

    const handleChangeRole = (e) => {
        setStudentStandard([]);
        setRole(e.target.value);
    };

    return (
        <div className="w-full sm:w-7/12 lg:w-4/12 mx-auto flex items-center select-none">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <form
                onSubmit={handleSubmit}
                onChange={() => setFirebaseError('')}
                className="flex flex-col gap-y-5 border p-5 rounded-2xl shadow-md w-full"
            >
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <MdOutlineAdminPanelSettings className="text-4xl text-blue-600" />
                    <h1 className="text-3xl logo_font">TSAC</h1>
                </div>
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-3">
                        <div className="flex flex-col relative">
                            <HiOutlineUser className="absolute top-3 left-3 text-blue-600 text-lg" />
                            <input
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputStyle}
                                type="text"
                                placeholder="Name"
                            />
                            {errors.name && touched.name && (
                                <p className="text-red-500 pt-1 pl-2">* {errors.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col relative">
                            <HiOutlinePhone className="absolute top-3 left-3 text-blue-600 text-lg" />
                            <input
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputStyle}
                                type="text"
                                placeholder="Phone"
                            />
                            {errors.phone && touched.phone && (
                                <p className="text-red-500 pt-1 pl-2">* {errors.phone}</p>
                            )}
                        </div>
                        <div className="flex flex-col relative">
                            <HiOutlineMail className="absolute top-3 left-3 text-blue-600 text-lg" />
                            <input
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputStyle}
                                type="email"
                                placeholder="Email"
                            />
                            {errors.email && touched.email && (
                                <p className="text-red-500 pt-1 pl-2">* {errors.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col relative">
                            <HiOutlineLockClosed className="absolute top-3 left-3 text-blue-600 text-lg" />
                            <input
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputStyle}
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
                    </div>

                    <div className="flex flex-col justify-center gap-y-5">
                        <div>
                            <div>
                                <h1>Select Role</h1>
                            </div>

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="role"
                                row
                                onChange={(e) => {
                                    handleChange(e);
                                    handleChangeRole(e);
                                }}
                            >
                                <FormControlLabel
                                    value="student"
                                    control={<Radio />}
                                    label="Student"
                                />

                                <FormControlLabel
                                    value="teacher"
                                    control={<Radio />}
                                    label="Teacher"
                                />
                            </RadioGroup>
                            {errors.role && touched.role && (
                                <p className="text-red-500 pt-1 pl-2">* {errors.role}</p>
                            )}
                        </div>

                        <div>
                            {role === 'student' && (
                                <div>
                                    <FormControl sx={{ width: 1 }} size="small">
                                        <InputLabel id="demo-select-small">Standard</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={studentStandard}
                                            label="Standard"
                                            onChange={handleStudentStandardChange}
                                            sx={{ width: 1 }}
                                        >
                                            <MenuItem value="HSC-1st">HSC-1st</MenuItem>
                                            <MenuItem value="HSC-2nd">HSC-2nd</MenuItem>
                                            <MenuItem value="SSC">SSC</MenuItem>
                                            <MenuItem value="8">8</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {errors.standard && touched.standard && (
                                        <p className="text-red-500 pt-1 pl-2">
                                            * {errors.standard}
                                        </p>
                                    )}
                                </div>
                            )}

                            {role === 'teacher' && (
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="standard"
                                            value="HSC-2nd"
                                            checked={values.standard.includes('HSC-2nd')}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setFieldValue('standard', [
                                                        ...values.standard,
                                                        'HSC-2nd',
                                                    ]);
                                                } else {
                                                    setFieldValue(
                                                        'standard',
                                                        values.standard.filter(
                                                            (value) => value !== 'HSC-2nd'
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        HSC-2nd
                                    </label>
                                    <br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="standard"
                                            value="HSC-1st"
                                            checked={values.standard.includes('HSC-1st')}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setFieldValue('standard', [
                                                        ...values.standard,
                                                        'HSC-1st',
                                                    ]);
                                                } else {
                                                    setFieldValue(
                                                        'standard',
                                                        values.standard.filter(
                                                            (value) => value !== 'HSC-1st'
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        HSC-1st
                                    </label>
                                    <br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="standard"
                                            value="SSC"
                                            checked={values.standard.includes('SSC')}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setFieldValue('standard', [
                                                        ...values.standard,
                                                        'SSC',
                                                    ]);
                                                } else {
                                                    setFieldValue(
                                                        'standard',
                                                        values.standard.filter(
                                                            (value) => value !== 'SSC'
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        SSC
                                    </label>
                                    <br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="standard"
                                            value="8"
                                            checked={values.standard.includes('8')}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setFieldValue('standard', [
                                                        ...values.standard,
                                                        '8',
                                                    ]);
                                                } else {
                                                    setFieldValue(
                                                        'standard',
                                                        values.standard.filter(
                                                            (value) => value !== '8'
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        8
                                    </label>
                                    {errors.standard && touched.standard && (
                                        <p className="text-red-500 pt-1 pl-2">
                                            * {errors.standard}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {!saveLoading ? (
                        <div>
                            {firebaseError === 'Firebase: Error (auth/email-already-in-use).' &&
                                (<div className="text-red-600 pb-3">
                                    * This email is already registered
                                </div>)(
                                    firebaseError !==
                                        'Firebase: Error (auth/email-already-in-use).' && (
                                        <h1 className="text-red-600 pb-3">* {firebaseError}</h1>
                                    )
                                )}
                            <button
                                type="submit"
                                className="p-2 w-full border bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                Create Account
                            </button>
                        </div>
                    ) : (
                        <button
                            disabled
                            type="submit"
                            className="p-2 w-full border bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex justify-center cursor-not-allowed opacity-50"
                        >
                            <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Accounts;
