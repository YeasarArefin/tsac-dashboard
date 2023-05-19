/* eslint-disable no-restricted-syntax */
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function FeesDialog({ fees, vat, discount }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let subTotal = 0;
    for (const fee of fees) {
        subTotal += Number(fee.fee);
    }
    const vatTotal = subTotal + (subTotal * Number(vat)) / 100;
    const totalFee = vatTotal - (vatTotal * Number(discount)) / 100;

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
                <DialogTitle id="alert-dialog-title">Fee Lists</DialogTitle>
                <DialogContent style={{ textTransform: 'capitalize' }}>
                    {fees.map((sub) => (
                        <div>
                            {sub.name} :{' '}
                            <span style={{ fontWeight: 'bold' }}>{sub.fee} &#2547;</span>
                        </div>
                    ))}
                    <div>
                        Subtotal : <span style={{ fontWeight: 'bold' }}>{subTotal} &#2547;</span>
                    </div>
                    <div>
                        With {vat}% Vat:{' '}
                        <span style={{ fontWeight: 'bold' }}>{vatTotal} &#2547;</span>
                    </div>
                    {discount > 0 ? (
                        <div>
                            With {discount} % Discount:{' '}
                            <span style={{ fontWeight: 'bold' }}>{totalFee} &#2547;</span>
                        </div>
                    ) : (
                        <div>
                            Total : <span style={{ fontWeight: 'bold' }}>{totalFee} &#2547;</span>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
