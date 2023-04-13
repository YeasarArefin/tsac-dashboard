/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

const InvoiceTable = ({ items, setItems }) => {
    // const [items, setItems] = useState([
    //     { id: 1, item: 'Item 1', month: 1, price: 10 },
    //     { id: 2, item: 'Item 2', month: 2, price: 20 },
    //     { id: 3, item: 'Item 3', month: 3, price: 30 },
    // ]);

    const [newItem, setNewItem] = useState({ item: 'Tuition Fees', month: 'Month Name', price: 1 });

    const handleChange = (event) => {
        // console.log(
        //     '🚀 ~ file: InvoiceTable.jsx:18 ~ handleChange ~ data:',
        //     format(event.$d, 'MM/dd/yyyy')
        // );

        const { name, value } = event.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        const id = items.length + 1;
        setItems((prev) => [...prev, { id, ...newItem }]);
        setNewItem({ item: 'Tuition Fees', month: 'Month Name', price: 1 });
    };

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
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
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="bg-white border-b text-center">
                                <td className="px-6 py-4">{item.item}</td>
                                <td className="px-6 py-4">{item.month}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 duration-300 hover:bg-red-600 text-red-600 hover:text-white  rounded-full"
                                    >
                                        <AiOutlineDelete className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        <tr className="bg-white border-b text-center">
                            <td className="px-6 py-4">
                                <input
                                    className="border p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                    type="text"
                                    name="item"
                                    value={newItem.item}
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    className="border p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                    type="text"
                                    name="month"
                                    value={newItem.month}
                                    onChange={handleChange}
                                />
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                                {/* <DemoContainer components={['DatePicker']}> */}
                                {/* <DatePicker
                                        // label="Basic month picker"
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                height: '5px', // Set your height here.
                                                width: '100px',
                                            },
                                        }}
                                        onChange={handleChange}
                                    /> */}
                                {/* </DemoContainer> */}
                                {/* </LocalizationProvider> */}
                            </td>

                            <td className="px-6 py-4">
                                <input
                                    className="border p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                    type="number"
                                    min={1}
                                    name="price"
                                    value={newItem.price}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={handleAdd}
                                    className="p-2 duration-300 hover:bg-green-600 text-green-600 hover:text-white rounded-full"
                                >
                                    <AiOutlinePlus className="text-lg" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceTable;
