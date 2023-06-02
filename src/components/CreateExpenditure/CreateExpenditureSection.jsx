/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ExpenditureSchema from '../../utils/ValidationSchemas/Expenditure';

export default function CreateExpenditureSection() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [editorText, setEditorText] = useState('');
    const [initialValues, setInitialValues] = useState({
        amount: '',
        title: '',
    });

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: ExpenditureSchema,
        onSubmit: async (value, action) => {
            value.description = editorText;
            console.log('🚀 ~ file: CreateExpenditureSection.jsx:22 ~ onSubmit: ~ value:', value);
            const { status } = await axios.post(
                'https://tsac.onrender.com/api/v1/expenditure',
                value,
                {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            if (status === 200) {
                toast.success('Expenditure Added', {
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
                setEditorText('');
            }
        },
    });

    return (
        <section className="w-8/12 mx-auto">
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
            <form onSubmit={handleSubmit}>
                <h1 className="text-center text-xl font-bold mb-5">Create Expenditure</h1>
                <div className="flex flex-col justify-center gap-5">
                    <div>
                        <h1 className="font-bold">Amount &#2547; :</h1>
                        <input
                            name="amount"
                            value={values.amount}
                            type="number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="w-full px-2 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2"
                            placeholder="0"
                        />
                        {errors.amount && touched.amount && (
                            <p className="text-red-500 pt-1 pl-2">*{errors.amount}</p>
                        )}
                    </div>

                    <div>
                        <h1 className="font-bold">Title :</h1>
                        <input
                            name="title"
                            value={values.title}
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Give a title"
                            className="w-full px-2 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2"
                        />
                        {errors.title && touched.title && (
                            <p className="text-red-500 pt-1 pl-2">*{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <h1 className="font-bold">Description :</h1>
                        <Editor
                            apiKey="hu5bmmssqbp7bg7b7or682bm9fbdce4gy5e52fcy3jlqwh81"
                            init={{
                                height: 400,
                                plugins: [
                                    'image',
                                    'media',
                                    'lists',
                                    'link',
                                    'table',
                                    'codesample',
                                    'code',
                                    'searchreplace',
                                    'fullscreen',
                                    'preview',
                                ],
                                toolbar:
                                    'undo redo |' +
                                    'bold italic backcolor forecolor | fontsizeselect | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent',

                                style_formats: [
                                    {
                                        title: 'Image Left',
                                        selector: 'img',
                                        styles: {
                                            float: 'left',
                                            margin: '0 10px 0 10px',
                                        },
                                    },
                                    {
                                        title: 'Image Right',
                                        selector: 'img',
                                        styles: {
                                            float: 'right',
                                            margin: '0 0 10px 10px',
                                        },
                                    },
                                ],
                            }}
                            onEditorChange={(text) => setEditorText(text)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 border rounded-xl bg-blue-500 text-white hover:bg-blue-600 duration-200 focus:ring-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
