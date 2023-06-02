/* eslint-disable no-restricted-syntax */
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function ExpenditureDescriptionDialog({ description }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" >
                Open alert dialog
            </Button> */}
            <button
                type="button"
                onClick={handleClickOpen}
                className="border border-blue-500 px-2 rounded-full font-bold "
            >
                view
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Expenditure Details</DialogTitle>
                <DialogContent
                    dangerouslySetInnerHTML={{ __html: description }}
                    style={{ textTransform: 'capitalize' }}
                />
            </Dialog>
        </div>
    );
}
