import React from 'react';

const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen relative">
            <div className="logo_font text-3xl absolute">TSAC</div>
            <div className="w-28 h-28 border-4 border-dashed rounded-full animate-spin dark:border-blue-400" />
        </div>
    );
};

export default Spinner;
