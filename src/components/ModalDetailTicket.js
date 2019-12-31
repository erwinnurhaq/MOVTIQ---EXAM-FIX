import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';



function ModalDetailTicket({ show, setShow, myTransactions, selectedRow, formatter, alf }) {

    //table material
    const columns = [
        { id: 'id', label: 'id', minWidth: 50, align: 'center' },
        { id: 'movie-title', label: 'Movie Title', minWidth: 50, align: 'center' },
        { id: 'seat-amount', label: 'Seat Amount', minWidth: 100, align: 'center' },
        { id: 'seats', label: 'Seats', minWidth: 100, align: 'center' },
        { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
    ];

    if (selectedRow === null) {
        return null;
    } else {
        return (
            <Dialog open={show} onClose={() => setShow(!show)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
                <DialogTitle id="form-dialog-title">Detail Ticket</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myTransactions[selectedRow].transactionDetail.map((ticket, idx) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{ticket.title}</TableCell>
                                        <TableCell>{ticket.seatAmount}</TableCell>
                                        <TableCell>
                                            {ticket.seats.map((seat, idx) => (
                                                <div key={idx}>{alf.charAt(seat[0] - 1)}{seat[1]}</div>
                                            ))}
                                        </TableCell>
                                        <TableCell>{formatter.format(ticket.sumPrice)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setShow(!show)} >OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ModalDetailTicket
