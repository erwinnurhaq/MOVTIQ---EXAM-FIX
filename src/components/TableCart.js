import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//components
import TablePaginationActions from './TablePaginationAction';

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



function TableCart({ formatter, carts, movies, setSelectedRow, modalRemove, setModalRemove, checkOutHandler, totalPriceCart }) {

    const removeDialogue = e => {
        setSelectedRow(parseInt(e.currentTarget.closest("tr").id));
        setModalRemove(!modalRemove);
    }

    //table material
    const columns = [
        { id: 'no', label: '#', minWidth: 20, align: 'center' },
        { id: 'image', label: 'image', minWidth: 70, align: 'center' },
        { id: 'movie-title', label: 'Movie Title', minWidth: 50, align: 'center' },
        { id: 'amount', label: 'Amount', maxWidth: 50, align: 'center' },
        { id: 'seats', label: 'Seats.', minWidth: 50, align: 'center' },
        { id: 'price', label: 'Price', minWidth: 50, align: 'center' },
        { id: 'option', label: 'Option', minWidth: 50, align: 'center' }
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

    //find movie
    const findMovieImage = (cart) => {
        if (movies.length === 0) {
            return null;
        } else {
            let idx = movies.findIndex(a => a.name === cart.title);
            return movies[idx].image;
        }
    }
    const alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const renderRow = (cart, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index} id={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell><img className="movie-img" src={findMovieImage(cart)} alt={index} /></TableCell>
                <TableCell><b>{cart.title}</b></TableCell>
                <TableCell>{cart.seatAmount}</TableCell>
                <TableCell>{cart.seats.map((seat, idx) => (
                    <div key={idx}>{alf.charAt(seat[0] - 1)}{seat[1]}</div>
                ))}</TableCell>
                <TableCell>{formatter.format(cart.sumPrice)}</TableCell>
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
                    {carts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cart, index) => (
                        renderRow(cart, index)
                    ))}
                    <tr className="pagination"><TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={carts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    /></tr>
                </TableBody>
            </Table>
            <Button variant='contained' className="btn-checkout" onClick={checkOutHandler}>
                <div>
                    Total Price: {formatter.format(totalPriceCart())}
                </div>
                <div >
                    CHECK OUT! <ShoppingCartIcon />
                </div>
            </Button>
        </>
    )
}

export default TableCart;