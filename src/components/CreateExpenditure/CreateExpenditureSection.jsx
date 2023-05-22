/* eslint-disable no-alert */
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import ExpenditureSchema from '../../utils/ValidationSchemas/Expenditure';

export default function CreateExpenditureSection() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [initialValues, setInitialValues] = useState({
        amount: '',
        description: '',
    });

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: ExpenditureSchema,
        onSubmit: async (value, action) => {
            const { status } = await axios.post(
                'https://tsac.onrender.com/api/v1/expenditure',
                value
            );
            if (status === 200) {
                alert('Success');
                action.resetForm();
            }
        },
    });

    return (
        <section className="w-8/12 mx-auto">
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
                        />
                        {errors.amount && touched.amount && (
                            <p className="text-red-500 pt-1 pl-2">*{errors.amount}</p>
                        )}
                    </div>

                    <div>
                        <h1 className="font-bold">Description :</h1>
                        <textarea
                            name="description"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="outline-none border-2 rounded-xl focus:border-blue-600 duration-150 p-5 w-full"
                            placeholder="Write Here . . ."
                            cols="30"
                            rows="10"
                        />
                        {errors.description && touched.description && (
                            <p className="text-red-500 pt-1 pl-2">*{errors.description}</p>
                        )}
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
