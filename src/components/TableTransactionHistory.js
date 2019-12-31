import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';

//components
import TablePaginationActions from './TablePaginationAction';

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



function TableTransactionHistory({ transactions, setSelectedRow, modalRemove, setModalRemove }) {


    // Formatter Rupiah
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2
    });
    const alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const removeDialogue = e => {
        setSelectedRow(parseInt(e.currentTarget.closest("tr").id));
        setModalRemove(!modalRemove);
    }

    //table material
    const columns = [
        { id: 'no', label: '#', minWidth: 50, align: 'center' },
        { id: 'transaction-id', label: 'Transaction Id', minWidth: 50, align: 'center' },
        { id: 'date-time', label: 'Date and Time', minWidth: 100, align: 'center' },
        { id: 'user', label: 'User', minWidth: 100, align: 'center' },
        { id: 'ticket-amount', label: 'Ticket Amount', minWidth: 100, align: 'center' },
        { id: 'tickets', label: 'Tickets', minWidth: 100, align: 'center' },
        { id: 'total-price', label: 'Total Price', minWidth: 100, align: 'center' },
        { id: 'option', label: 'Option', minWidth: 100, align: 'center' }
    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //end table material

    const renderRow = (trans, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={trans.id} id={trans.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>ID: {trans.id}</TableCell>
                <TableCell>
                    <div>{trans.date}</div>
                    <div>{trans.hours} : {trans.minutes}</div>
                </TableCell>
                <TableCell>{trans.username}</TableCell>
                <TableCell>{trans.ticketAmount}</TableCell>
                <TableCell>
                    {trans.transactionDetail.map((ticket, ticketIdx) => {
                        return (
                            <Button key={ticket.title} className="ticket-item">
                                <div className="info">
                                    <h3>{ticket.title}</h3>
                                    <div>{formatter.format(ticket.sumPrice)}</div>
                                    <div>{ticket.seatAmount} seat/s</div>
                                </div>
                                <div className="seats">{ticket.seats.map((seat, idx) => (
                                    <div key={idx}>{alf.charAt(seat[0] - 1)}{seat[1]}</div>
                                ))}</div>
                            </Button>
                        )
                    })}
                </TableCell>
                <TableCell>{formatter.format(trans.totalPrice)}</TableCell>
                <TableCell className="option-container"><Button variant='contained' color="secondary" onClick={removeDialogue}>REMOVE</Button></TableCell>
            </TableRow>
        )
    }


    //!MAIN RENDER ---------------------------------------------------/
    return (
        <>
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
                    {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trans, index) => (renderRow(trans, index)))}
                </TableBody>
            </Table>
            <table>
                <tbody>
                    <tr>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={transactions.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableTransactionHistory;