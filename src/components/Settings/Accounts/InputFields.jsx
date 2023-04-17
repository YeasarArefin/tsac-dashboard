/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import {
    HiOutlineBookOpen,
    HiOutlineLockClosed,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineUser,
} from 'react-icons/hi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

const InputFields = ({ values, handleChange, handleBlur, errors, touched }) => {
    const [eyeIsClosed, setEyeIsClosed] = useState(true);
    const inputStyle =
        'w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2';

    return (
        <div className="flex flex-col lg:grid lg::grid-cols-2 gap-x-4 gap-y-4">
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
                <HiOutlineBookOpen className="absolute top-3 left-3 text-blue-600 text-lg" />
                <input
                    name="institute"
                    value={values.institute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputStyle}
                    type="text"
                    placeholder="Institute"
                />
                {errors.institute && touched.institute && (
                    <p className="text-red-500 pt-1 pl-2">* {errors.institute}</p>
                )}
            </div>
            <div className="flex col-span-2 flex-col relative">
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
                    onClick={() => setEyeIsClosed(!eyeIsClosed)}
                    className="absolute right-3 top-3 p-1 cursor-pointer"
                >
                    {eyeIsClosed ? <VscEye /> : <VscEyeClosed />}
                </div>
                {errors.password && touched.password && (
                    <p className="text-red-500 pt-1 pl-2">* {errors.password}</p>
                )}
            </div>
        </div>
    );
};

export default InputFields;
