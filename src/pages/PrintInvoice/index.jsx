/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import ViewTable from '../../components/Invoice/View/ViewTable';

export default function PrintInvoice() {
    const [invoice, setInvoice] = useState({});
    const params = useParams();
    const _id = params.id;

    useEffect(() => {
        const getInvoiceByID = async () => {
            const { data, status } = await axios.get(
                `https://tsac.onrender.com/api/v1/invoice?id=${_id}`,
                { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
            );
            if (status === 200) {
                setInvoice(data[0]);
            }
        };
        getInvoiceByID();
    }, [_id]);
    console.log('🚀 ~ file: index.jsx:9 ~ PrintInvoice ~ invoice:', invoice);

    return (
        <div>
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
                                    {moment(invoice?.createdAt).format('MMM Do YY')}
                                </h1>

                                <div className="flex justify-end print:hidden">
                                    <button
                                        className="flex items-center justify-center gap-x-1 p-2 text-red-600 border border-red-600 rounded-lg"
                                        type="button"
                                        onClick={() => window.print()}
                                    >
                                        <AiOutlinePrinter />
                                        Print
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
                                    <span>{invoice?.name} </span>
                                </p>
                                <p>
                                    <span className="font-bold">Contact :</span>
                                    <span>{invoice?.phone}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Email :</span>{' '}
                                    <span>{invoice?.email}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Institute :</span>
                                    <span> {invoice?.institute}</span>
                                </p>
                            </div>
                            <div className="text-end">
                                <h1 className="text-2xl font-extrabold">Invoice from</h1>
                                <h1>Tanveer's Science Academic Coaching</h1>
                                <h1>Contact : 01303-451671</h1>
                                <h1>Address : Uttar Badda, in branch</h1>
                            </div>
                        </div>

                        <ViewTable
                            tableItems={invoice?.fees}
                            vat={invoice?.vat}
                            discount={invoice?.discount}
                            totalFee={invoice?.payment}
                            vatTotal={invoice?.vatTotal}
                            subTotal={invoice?.subTotal}
                        />
                        <div className="flex flex-col items-end mt-10">
                            <h1 className="border-b-2 sign_font font-semibold text-3xl">
                                Tanveer Ahmed
                            </h1>
                            <h1>Signature</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
