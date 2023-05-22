import React from 'react';

export default function InfoCard({ name, icon, data }) {
    return (
        <div className="w-full h-[200px] border rounded-xl p-5 flex flex-col justify-between shadow-xl">
            <div className="flex flex-wrap justify-between items-center">
                <h1 className="text-2xl">{name}</h1>
                <h1 className="p-3 border rounded-full text-3xl">{icon}</h1>
            </div>
            <div className="flex items-center gap-x-2">
                <h1 className="text-3xl">{icon}</h1>
                <h1 className="text-2xl font-extrabold">{data}</h1>
            </div>
        </div>
    );
}
