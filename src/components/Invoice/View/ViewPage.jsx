/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PrintProvider, { NoPrint, Print } from 'react-easy-print';
import { AiOutlineEdit, AiOutlinePrinter } from 'react-icons/ai';
import ViewTable from './ViewTable';

const ViewPage = ({ setPreview, currentUser, tableItems, vat, discount }) => {
    return (
        <PrintProvider>
            <Print single name="invoice">
                <div className="p-3 md:p-10 print:-mt-[100px] flex flex-col gap-y-10 print:w-[595px] mx-auto">
                    <div>
                        <div className="flex justify-between">
                            <div>
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
                                <NoPrint>
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
                                </NoPrint>
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

                        <ViewTable tableItems={tableItems} vat={vat} discount={discount} />
                    </div>
                </div>
            </Print>
        </PrintProvider>
    );
};

export default ViewPage;
