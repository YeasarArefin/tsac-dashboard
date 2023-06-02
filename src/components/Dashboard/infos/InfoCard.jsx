import React from 'react';

export default function InfoCard({ name, icon, data }) {
    return (
        <div className="w-full h-[200px] border rounded-xl p-5 flex flex-col justify-between shadow-xl  ">
            <div className="flex flex-wrap justify-between items-center italic">
                <div>
                    <h1 className="text-3xl font-black">{name}</h1>
                    <div className="h-1 w-18 rounded-full bg-blue-600 mt-2 shadow-2xl" />
                </div>
                <h1 className="p-3 border-2 border-blue-400 shadow-xl text-blue-800 rounded-full text-3xl">
                    {icon}
                </h1>
            </div>
            <div className="flex items-center gap-x-2">
                <h1 className="text-3xl">{icon}</h1>
                <h1 className="text-2xl font-black">{data}</h1>
            </div>
        </div>
    );
}
