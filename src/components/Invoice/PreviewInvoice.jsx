/* eslint-disable no-restricted-syntax */
import React, { useRef } from 'react';
import { AiOutlineEdit, AiOutlinePrinter } from 'react-icons/ai';

const PreviewInvoice = ({ name, contact, address, items, setPreview }) => {
    const componentRef = useRef('');

    let total = 0;
    for (const item of items) {
        total += Number(item.price);
    }
    return (
        <div className="p-10 border flex flex-col gap-y-5" ref={componentRef}>
            <div className="flex justify-between">
                <div>
                    <h1 className="logo_font text-4xl">TSAC</h1>
                    <h1 className="font-bold italic">Tanvir&apos;s Science Academic Coaching</h1>
                    <h1 className="text-sm">Jamtola, Shadhinota Sharani Jame Masjid</h1>
                </div>
                <div className="flex flex-col justify-end gap-y-2">
                    <h1 className="text-4xl font-extrabold text-right">Invoice</h1>
                    <h1 className="font-semibold text-end">
                        Date : {new Date().toLocaleDateString()}
                    </h1>
                    <div className="flex gap-x-2">
                        <button
                            className="flex items-center justify-center gap-x-1 p-2 text-green-600 border border-green-600 rounded-lg"
                            type="button"
                            onClick={() => {
                                setPreview(false);
                            }}
                        >
                            <AiOutlineEdit /> Edit
                        </button>
                        <button
                            className="flex items-center justify-center gap-x-1 p-2 text-blue-600 border border-blue-600 rounded-lg"
                            type="button"
                            onClick={() => window.print()}
                        >
                            <AiOutlinePrinter />
                            Print
                        </button>
                    </div>
                </div>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold">Billed to</h1>
                    <h1 className="font-medium">Name : {name}</h1>
                    <h1 className="font-medium">Contact : {contact}</h1>
                    <h1 className="font-medium">Address : {address}</h1>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold">Invoice from</h1>
                    <h1 className="font-medium">Tanvir&apos;s Science Academic Coaching</h1>
                    <h1 className="font-medium">Contact : 0187777777</h1>
                    <h1 className="font-medium">Address : satarkul, in branch</h1>
                </div>
            </div>

            <hr className="my-5" />

            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-blue-600 text-white text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    item
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    month
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="bg-white border-b text-center">
                                    <td className="px-6 py-4">{item.item}</td>
                                    <td className="px-6 py-4">{item.month}</td>
                                    <td className="px-6 py-4">{item.price} &#2547;</td>
                                </tr>
                            ))}
                            <tr className="text-center">
                                <td className="px-6 py-4" />
                                <td className="px-6 py-4" />
                                <td className="px-6 py-4 text-[15px] font-bold">
                                    Total : {total} &#2547;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col items-end mt-5">
                <span className="sign_font font-bold text-3xl border-b">Tanvir Ahmed</span>
                <span>Paid Signature</span>
            </div>
        </div>
    );
};

export default PreviewInvoice;
