/* eslint-disable react/button-has-type */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import TakaSign from '../../UI/TakaSign';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function EditTable({ tableItems, handleChange, handleAdd, handleDelete }) {
    return (
        <TableContainer component={Paper} className="shadow-none">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-blue-600">
                    <TableRow>
                        <TableCell className="text-white" align="center">
                            Name
                        </TableCell>
                        <TableCell className="text-white" align="center">
                            Fee
                        </TableCell>
                        <TableCell className="text-white" align="center">
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableItems?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="capitalize text-base" align="center">
                                {item.name}
                            </TableCell>
                            <TableCell className="capitalize text-base" align="center">
                                {item.fee} <TakaSign />
                            </TableCell>
                            <TableCell className="capitalize text-base" align="center">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 duration-300 hover:bg-red-600 text-red-600 hover:text-white  rounded-full"
                                >
                                    <AiOutlineDelete className="text-lg" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="center">
                            <input
                                className="border p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                type="text"
                                name="name"
                                defaultValue="Tuition Fee"
                                onChange={handleChange}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <input
                                className="border p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 duration-200"
                                type="number"
                                min={1}
                                name="fee"
                                defaultValue={1}
                                onChange={handleChange}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <button
                                onClick={handleAdd}
                                className="p-2 duration-300 hover:bg-green-600 text-green-600 hover:text-white rounded-full"
                            >
                                <AiOutlinePlus className="text-lg" />
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
