import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/401Error.png';

const index = () => {
    return (
        <div className="flex flex-col justify-start items-center h-[96vh]">
            <img className="w-full lg:w-4/12 mx-auto" src={errorImage} alt="404" />
            <div>
                <Link to="/">
                    <a
                        href="#_"
                        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                            Button Text
                        </span>
                        <span className="relative invisible">Button Text</span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default index;
