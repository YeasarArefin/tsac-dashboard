/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import * as React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const SearchInput = styled(TextField)(({ theme }) => ({
    border: 'solid 10px orange',
}));
let deleteAccountById;
const userCol = [
    { field: 'id', headerName: 'ID', width: 250, valueGetter: (params) => `${params.row._id}` },
    {
        field: 'name',
        headerName: 'name',
        width: 250,
    },
    {
        field: 'email',
        headerName: 'email',
        width: 250,
    },
    {
        field: 'phone',
        headerName: 'phone',
        width: 250,
    },
    // {
    //     field: 'address',
    //     headerName: 'address',
    //     width: 200,
    //     valueGetter: (params) => `${params.row.address.street}`,
    // },
    {
        field: 'action',
        headerName: 'action',
        width: 100,
        renderCell: (params) => {
            return (
                <div className="flex items-center justify-center gap-x-5">
                    {/* <Link to={params.row._id}>
                        <div className="p-2 rounded-full border hover:bg-[#3d5ee1] text-md hover:text-white hover:border-white">
                            <FaRegEdit />
                        </div>
                    </Link> */}
                    <button
                        type="button"
                        onClick={() => deleteAccountById(params.row._id)}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-md text-white cursor-pointer"
                    >
                        <RxCross2 />
                    </button>
                </div>
            );
        },
    },
];

export default function StudentsList() {
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

    deleteAccountById = (_id) => {
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
                    .delete('https://tsac.onrender.com/api/v1/createaccount', {
                        data,
                        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                    })
                    .then(({ status }) => {
                        if (status === 200) {
                            Swal.fire('Deleted!', 'The Account has been deleted.', 'success');
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
                    <h1 className="text-2xl">Students</h1>
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
                    <Button variant="outlined">Add</Button>
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
