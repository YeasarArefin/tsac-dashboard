/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountSchema from '../../../utils/ValidationSchemas/Accounts.schema';
import useAuth from '../../../utils/hooks/useAuth';
import CreateButton from './CreateButton';
import InputFields from './InputFields';
import SelectRole from './SelectRole';
import StudentDetails from './StudentDetils';
import TeacherDetails from './TeacherDetails';

const Accounts = () => {
    const { createAccount, user } = useAuth();
    const nameRef = useRef('');
    const phoneRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const [studentStandard, setStudentStandard] = useState('');
    const [postError, setPostError] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);
    const [role, setRole] = useState('');
    const standards = ['HSC', 'SSC', '8'];

    const subjects = {
        HSC: [
            {
                name: 'physics - HSC',
                fee: 1000,
            },
            {
                name: 'chemistry - HSC',
                fee: 1000,
            },
            {
                name: 'biology - HSC',
                fee: 1000,
            },
            {
                name: 'higher math - HSC',
                fee: 1000,
            },
            {
                name: 'ict - HSC',
                fee: 1000,
            },
            {
                name: 'english - HSC',
                fee: 1000,
            },
        ],

        SSC: [
            {
                name: 'physics - SSC',
                fee: 1000,
            },
            {
                name: 'chemistry - SSC',
                fee: 1000,
            },
            {
                name: 'biology - SSC',
                fee: 1000,
            },
            {
                name: 'general math - SSC',
                fee: 1000,
            },
            {
                name: 'english - SSC',
                fee: 1000,
            },
        ],

        8: [
            {
                name: 'general math - 8',
                fee: 1000,
            },
            {
                name: 'science - 8',
                fee: 1000,
            },
            {
                name: 'english - 8',
                fee: 1000,
            },
        ],
    };
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: '',
        phone: '',
        email: '',
        institute: '',
        password: '',
        role: '',
        standard: [],
        subjects: [],
    });

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: AccountSchema,

            onSubmit: (value, action) => {
                setSaveLoading(true);
                axios
                    .post('https://tsac.onrender.com/api/v1/createaccount', value, {
                        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
                    })
                    .then((res) => {
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
                            setStudentStandard('');
                        }
                    })
                    .catch((err) => setPostError(err));
            },
        });

    const handleStudentStandardChange = (e) => {
        const newInitValue = values;
        newInitValue.standard = [e.target.value];
        setInitialValues(newInitValue);
        setStudentStandard(e.target.value);
    };
    const handleChangeRole = (e) => {
        setStudentStandard([]);
        setRole(e.target.value);
        handleChange(e);
    };

    return (
        <div className="w-full lg:w-7/12  mx-auto flex items-center select-none">
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
                onChange={() => setPostError('')}
                onSubmit={handleSubmit}
                className="flex flex-col gap-y-5 border p-5 rounded-2xl shadow-md w-full"
            >
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <MdOutlineAdminPanelSettings className="text-4xl text-blue-600" />
                    <h1 className="text-3xl logo_font">TSAC</h1>
                </div>

                <div className="flex flex-col gap-y-10">
                    {/* accounts input fields */}
                    <InputFields
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />

                    <div className="flex flex-col justify-center gap-y-5">
                        {/* change role */}
                        <SelectRole
                            handleChangeRole={handleChangeRole}
                            errors={errors}
                            touched={touched}
                        />

                        <div>
                            {/* select students type and data */}
                            <StudentDetails
                                role={role}
                                standards={standards}
                                setFieldValue={setFieldValue}
                                subjects={subjects}
                                values={values}
                                studentStandard={studentStandard}
                                handleStudentStandardChange={handleStudentStandardChange}
                                errors={errors}
                                touched={touched}
                            />

                            {/* select teachers type and data */}
                            <TeacherDetails
                                values={values}
                                standards={standards}
                                subjects={subjects}
                                setFieldValue={setFieldValue}
                                role={role}
                                errors={errors}
                                touched={touched}
                            />
                        </div>
                    </div>

                    {/* create account button */}
                    {postError}
                    <CreateButton saveLoading={saveLoading} />
                </div>
            </form>
        </div>
    );
};

export default Accounts;
