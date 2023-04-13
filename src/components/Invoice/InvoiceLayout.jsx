import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import InvoiceTable from './InvoiceTable';
import PreviewInvoice from './PreviewInvoice';

const InvoiceLayout = () => {
    const [preview, setPreview] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [items, setItems] = useState([
        { id: 1, item: 'Item 1', month: 'Month Name', price: 10 },
        { id: 2, item: 'Item 2', month: 'Month Name', price: 20 },
        { id: 3, item: 'Item 3', month: 'Month Name', price: 30 },
    ]);
    return (
        <div>
            {!preview ? (
                <div className="p-10 border flex flex-col gap-y-8">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="logo_font text-4xl">TSAC</h1>
                            <h1 className="font-bold italic">
                                Tanvir&apos;s Science Academic Coaching
                            </h1>
                            <h1 className="text-sm">Jamtola, Shadhinota Sharani Jame Masjid</h1>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-4xl font-extrabold text-right">Invoice</h1>
                            <h1 className="font-semibold">
                                Date : {new Date().toLocaleDateString()}
                            </h1>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-x-1 p-2 text-blue-600 border border-blue-600 rounded-lg"
                                onClick={() => {
                                    setPreview(true);
                                    setOpen(true);
                                }}
                            >
                                <AiOutlineEye /> Preview
                            </button>
                        </div>
                    </div>

                    <hr className="my-5" />

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-y-5">
                            <h1 className="text-2xl font-extrabold">Billed to</h1>
                            <h1>
                                Name :{' '}
                                <input
                                    className="border p-1 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                    type="text"
                                    name="item"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    // onChange={handleChange}
                                />
                            </h1>

                            <h1 className="font-medium">
                                Contact :{' '}
                                <input
                                    className="border p-1 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                    type="text"
                                    name="item"
                                    onChange={(e) => setContact(e.target.value)}
                                    value={contact}
                                    // onChange={handleChange}
                                />
                            </h1>
                            <h1 className="font-medium">
                                Address :{' '}
                                <input
                                    className="border p-1 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                    type="text"
                                    name="item"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    // onChange={handleChange}
                                />
                            </h1>
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold">Invoice from</h1>
                            <h1>Tanvir&apos;s Science Academic Coaching</h1>
                            <h1>Contact : 0187777777</h1>
                            <h1>Address : satarkul, in branch</h1>
                        </div>
                    </div>

                    <hr className="my-5" />

                    <div>
                        <InvoiceTable items={items} setItems={setItems} />
                    </div>

                    <div className="flex flex-col items-end mt-5">
                        <span className="sign_font font-bold text-3xl border-b">Tanvir Ahmed</span>
                        <span>Signature</span>
                    </div>
                </div>
            ) : (
                <PreviewInvoice
                    name={name}
                    address={address}
                    setPreview={setPreview}
                    contact={contact}
                    items={items}
                />
            )}
        </div>
    );
};

export default InvoiceLayout;
