/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import React from 'react';
import { AiOutlineEdit, AiOutlinePrinter, AiOutlineSave } from 'react-icons/ai';
import ViewTable from './ViewTable';

const ViewPage = ({ setPreview, currentUser, tableItems, vat, discount }) => {
    let subTotal = 0;
    for (const item of tableItems) {
        subTotal += Number(item.fee);
    }
    const vatTotal = subTotal + (subTotal * Number(vat)) / 100;
    const totalFee = Math.floor(vatTotal - (vatTotal * Number(discount)) / 100);

    const { name, phone, email, institute } = currentUser;
    const userInvoice = {
        name,
        phone,
        email,
        institute,
        fees: tableItems,
        vat,
        discount,
        payment: totalFee,
    };

    const handleSaveInvoice = async () => {
        try {
            const { status } = await axios.post(
                'http://localhost:5000/api/v1/invoice',
                userInvoice
            );
            if (status === 200) {
                console.log('🚀 ~ file: ViewPage.jsx:16 ~ handleSaveInvoice ~ status:', 'done');
            }
        } catch (error) {
            console.log('🚀 ~ file: ViewPage.jsx:15 ~ handleSaveInvoice ~ error:', error);
        }
    };

    return (
        <div>
            <div className="p-3 md:p-10 print:-mt-[100px] flex flex-col gap-y-10 print:w-[595px] mx-auto">
                <div>
                    <div className="flex justify-between">
                        <div className="mb-10">
                            <h1 className="logo_font text-4xl">TSAC</h1>
                            <h1 className="italic font-semibold">
                                Tanveer's Science Academic Coaching
                            </h1>
                            <h1 className="text-sm">Jamtola, Shadhinota Sharani Jame Masjid</h1>
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-end">Invoice</h1>
                            <h1 className="font-semibold text-xl text-right">
                                {new Date().toLocaleDateString()}
                            </h1>

                            <div className="flex gap-x-2 print:hidden">
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
                                    className="flex items-center justify-center gap-x-1 p-2 text-red-600 border border-red-600 rounded-lg"
                                    type="button"
                                    onClick={() => window.print()}
                                >
                                    <AiOutlinePrinter />
                                    Print
                                </button>
                                <button
                                    className="flex items-center justify-center gap-x-1 p-2 text-blue-600 border border-blue-600 rounded-lg"
                                    type="button"
                                    onClick={handleSaveInvoice}
                                >
                                    <AiOutlineSave />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex  justify-between mb-10">
                        <div>
                            <div className="text-2xl font-extrabold flex items-center gap-x-5">
                                <h1>Billed to</h1>
                            </div>
                            <p>
                                <span className="font-bold">Name :</span>{' '}
                                <span>{currentUser?.name} </span>
                            </p>
                            <p>
                                <span className="font-bold">Contact :</span>
                                <span>{currentUser?.phone}</span>
                            </p>
                            <p>
                                <span className="font-bold">Email :</span>{' '}
                                <span>{currentUser?.email}</span>
                            </p>
                            <p>
                                <span className="font-bold">Institute :</span>
                                <span> {currentUser?.institute}</span>
                            </p>
                        </div>
                        <div className="text-end">
                            <h1 className="text-2xl font-extrabold">Invoice from</h1>
                            <h1>Tanveer's Science Academic Coaching</h1>
                            <h1>Contact : 0187777777</h1>
                            <h1>Address : satarkul, in branch</h1>
                        </div>
                    </div>

                    <ViewTable
                        tableItems={tableItems}
                        vat={vat}
                        discount={discount}
                        currentUser={currentUser}
                        subTotal={subTotal}
                        totalFee={totalFee}
                        vatTotal={vatTotal}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewPage;
