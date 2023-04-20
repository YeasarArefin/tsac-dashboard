/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';
import TakaSign from '../../UI/TakaSign';

const ViewTable = ({ tableItems, vat, discount }) => {
    console.log('🚀 ~ file: ViewTable.jsx:15 ~ ViewTable ~ vat:', vat);
    let subTotal = 0;
    for (const item of tableItems) {
        subTotal += Number(item.fee);
    }
    const vatTotal = subTotal + (subTotal * Number(vat)) / 100;
    const totalFee = vatTotal - (vatTotal * Number(discount)) / 100;
    return (
        <TableContainer component={Paper} className="shadow-none" style={{ fontFamily: 'cursive' }}>
            <Table aria-label="simple table">
                <TableHead className="bg-blue-600">
                    <TableRow>
                        <TableCell className="text-white" align="center">
                            Name
                        </TableCell>
                        <TableCell className="text-white" align="center">
                            Fee
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
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell className="capitalize text-base" align="center">
                            {' '}
                        </TableCell>
                        <TableCell className="capitalize text-base" align="center">
                            <span className="font-bold">Subtotal :</span> {subTotal} <TakaSign />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="capitalize text-base" align="center">
                            {' '}
                        </TableCell>
                        <TableCell className="capitalize text-base" align="center">
                            <span className="font-bold">With {vat}% Vat : </span>
                            {vatTotal} <TakaSign />
                        </TableCell>
                    </TableRow>
                    {vatTotal !== totalFee && (
                        <TableRow>
                            <TableCell className="capitalize text-base" align="center">
                                {' '}
                            </TableCell>
                            <TableCell className="capitalize text-base" align="center">
                                <span className="font-bold">With {discount}% Discount : </span>
                                {totalFee} <TakaSign />
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell className="capitalize text-base" align="center">
                            {' '}
                        </TableCell>
                        <TableCell className="capitalize text-base" align="center">
                            <span className="font-bold">Total : </span>
                            {totalFee} <TakaSign />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ViewTable;
