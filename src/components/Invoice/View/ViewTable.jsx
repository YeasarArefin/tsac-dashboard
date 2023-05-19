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

const ViewTable = ({ tableItems, vat, discount, currentUser, subTotal, vatTotal, totalFee }) => {
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
                        <TableCell className="capitalize text-base" align="center" />
                        <TableCell className="capitalize text-base" align="center">
                            <span className="font-semibold">Subtotal : </span>
                            <span className="font-bold">{subTotal}</span> <TakaSign />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="capitalize text-base" align="center" />
                        <TableCell className="capitalize text-base" align="center">
                            <span className="font-semibold">With {vat}% Vat : </span>
                            <span className="font-bold">{vatTotal}</span> <TakaSign />
                        </TableCell>
                    </TableRow>
                    {vatTotal !== totalFee && (
                        <TableRow>
                            <TableCell className="capitalize text-base" align="center" />
                            <TableCell className="capitalize text-base" align="center">
                                <span className="font-semibold">With {discount}% Discount : </span>
                                <span className="font-bold">{totalFee}</span> <TakaSign />
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell className="capitalize text-base" align="center" />
                        <TableCell className="capitalize text-base" align="center">
                            <span className="font-bold">Total : </span>
                            <span className="font-bold">{totalFee}</span> <TakaSign />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ViewTable;
