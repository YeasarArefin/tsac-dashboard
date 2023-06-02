/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import { BsPrinter } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import FeesDialog from '../../components/UI/FeesDialog';

const SearchInput = styled(TextField)(({ theme }) => ({
    border: 'solid 10px orange',
}));

let deleteInvoiceById;

const userCol = [
    { field: 'id', headerName: 'ID', width: 250, valueGetter: (params) => `${params.row._id}` },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 180,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 120,
    },
    {
        field: 'institute',
        headerName: 'Institute',
        width: 200,
    },
    {
        field: 'payment',
        headerName: 'Payment',
        width: 150,
        renderCell: (params) => (
            <h1>
                {params.row.payment} <span className="font-bold">&#2547;</span>
            </h1>
        ),
    },
    {
        field: 'fees',
        headerName: 'Fees',
        width: 100,
        renderCell: (params) => (
            <FeesDialog
                fees={params.row.fees}
                vat={params.row.vat}
                discount={params.row.discount}
            />
        ),
    },
    {
        field: 'createdAt',
        headerName: 'CreatedAt',
        width: 200,
        renderCell: (params) => <h1>{moment(params.row.createdAt).format('Do MMM YY')}</h1>,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 120,
        renderCell: (params) => {
            return (
                <div className="flex items-center justify-center gap-x-2">
                    <Link
                        className="p-2 border rounded-full bg-blue-600 hover:bg-blue-500 duration-200 text-white text-lg"
                        to={`/print-invoice/${params.row._id}`}
                    >
                        <BsPrinter />
                    </Link>
                    <button
                        type="button"
                        onClick={() => deleteInvoiceById(params.row._id)}
                        className="p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-md text-white cursor-pointer"
                    >
                        <RxCross2 />
                    </button>
                </div>
            );
        },
    },

    // {
    //     field: 'action',
    //     headerName: 'Action',
    //     width: 100,
    //     renderCell: (params) => {
    //         return (
    //             <div className="flex items-center justify-center gap-x-5">
    //                 <Link to={params.row._id}>
    //                     <div className="p-2 rounded-full border hover:bg-[#3d5ee1] text-md hover:text-white hover:border-white">
    //                         <FaRegEdit />
    //                     </div>
    //                 </Link>
    //                 <div className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-md text-white cursor-pointer">
    //                     <RxCross2 />
    //                 </div>
    //             </div>
    //         );
    //     },
    // },
];

export default function ListInvoice() {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = React.useState(users);

    const handleSearch = (e) => {
        const seaerchedName = e.target.value;
        const matchedUser = users.filter((user) =>
            user.name.toLowerCase().includes(seaerchedName.toLowerCase())
        );
        setDisplayUsers(matchedUser);
        console.log('🚀 ~ file: TeachersList.jsx:88 ~ handleSearch ~ matchedUser:', matchedUser);
    };

    deleteInvoiceById = (_id) => {
        const data = { _id };
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete('https://tsac.onrender.com/api/v1/invoice', {
                        data,
                        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
                    })
                    .then(({ status }) => {
                        if (status === 200) {
                            Swal.fire('Deleted!', 'Invoice has been deleted.', 'success');
                            const remaining = displayUsers?.filter((user) => user._id !== _id);
                            setDisplayUsers(remaining);
                        }
                    });
            }
        });
    };

    return (
        <div className="box">
            <div className="flex flex-col gap-y-5">
                <div>
                    <h1 className="text-2xl">Invoice List</h1>
                </div>

                <div className="flex gap-x-5 mb-10">
                    <TextField
                        id="outlined-basic"
                        label="Seacrh Username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        onChange={handleSearch}
                    />
                    <Link to="/create-invoice">
                        <Button variant="outlined">Add</Button>
                    </Link>
                </div>
            </div>

            <Box sx={{ height: '68vh', width: '100%' }}>
                <DataGrid
                    rows={displayUsers}
                    columns={userCol}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus':
                            {
                                outline: 'none',
                            },
                    }}
                />
            </Box>
        </div>
    );
}
