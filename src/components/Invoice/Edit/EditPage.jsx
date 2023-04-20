/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineReceiptTax } from 'react-icons/hi';
import { TbDiscount2 } from 'react-icons/tb';
import EditTable from './EditTable';

const EditPage = ({
    data,
    setCurrentUser,
    setItems,
    setNewTableItem,
    setTableItems,
    newTableItem,
    tableItems,
    currentUser,
    setPreview,
    vat,
    setVat,
    discount,
    setDiscount,
}) => {
    const handleAccountChange = (e) => {
        const selectedAccount = e.target.value;
        if (selectedAccount) {
            const filterUser = data.filter((account) => account.name === selectedAccount);
            setCurrentUser(filterUser[0]);
            setItems(filterUser[0]?.subjects);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewTableItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = (e) => {
        const id = new Date().getTime() * Math.floor(Math.random() * 1000);
        setTableItems((prev) => [...prev, { id, ...newTableItem }]);
        setNewTableItem({ name: 'Tuition Fee', fee: 1 });
    };

    const handleDelete = (id) => {
        const newValue = tableItems.filter((item) => item?.id !== id);
        setTableItems(newValue);
    };

    return (
        <div className="p-3 md:p-10 border flex flex-col gap-y-10">
            <div className="flex justify-between">
                <div>
                    <h1 className="logo_font text-4xl">TSAC</h1>
                    <h1 className="italic font-semibold">Tanveer's Science Academic Coaching</h1>
                    <h1 className="text-sm">Jamtola, Shadhinota Sharani Jame Masjid</h1>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold">Invoice</h1>
                    <h1 className="font-semibold text-xl text-right">
                        {new Date().toLocaleDateString()}
                    </h1>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-x-1 p-2 text-blue-600 border border-blue-600 rounded-lg "
                        onClick={() => {
                            setPreview(true);
                        }}
                    >
                        <AiOutlineEye /> Preview
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between">
                <div>
                    <div className="text-2xl font-extrabold flex items-center gap-x-5">
                        <h1>Billed to</h1>
                        <Autocomplete
                            disablePortal
                            onBlur={handleAccountChange}
                            size="small"
                            id="combo-box-demo"
                            options={data || []}
                            getOptionLabel={(data) => data.name || ''}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Accounts" />}
                        />
                    </div>
                    <p>
                        <span className="font-bold">Name :</span> <span>{currentUser?.name} </span>
                    </p>
                    <p>
                        <span className="font-bold">Contact :</span>
                        <span>{currentUser?.phone}</span>
                    </p>
                    <p>
                        <span className="font-bold">Email :</span> <span>{currentUser?.email}</span>
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
                    <h1>Address : Satarkul, in branch</h1>
                </div>
            </div>

            <EditTable
                handleChange={handleChange}
                tableItems={tableItems}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
            />
            <div className="flex gap-5">
                <div className="flex items-center gap-x-2">
                    <div className="font-bold">VAT % :</div>
                    <div className="flex flex-col relative">
                        <HiOutlineReceiptTax className="absolute top-3 left-3 text-blue-600 text-lg" />
                        <input
                            name="name"
                            defaultValue={vat}
                            className="w-[200px] pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2"
                            type="number"
                            onChange={(e) => setVat(e.target.value)}
                            placeholder="Vat"
                            min={0}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <h1 className="font-bold">Discount % :</h1>
                    <div className="flex flex-col relative">
                        <TbDiscount2 className="absolute top-3 left-3 text-blue-600 text-lg" />
                        <input
                            name="name"
                            defaultValue={discount}
                            className="w-[200px] pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 focus:ring-offset-2"
                            type="number"
                            onChange={(e) => setDiscount(e.target.value)}
                            placeholder="Discount"
                            min={0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
