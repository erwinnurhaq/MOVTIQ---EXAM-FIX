import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';



function ModalSuccessCart(props) {

    return (
        <Dialog open={props.modalSuccessCart} onClose={() => props.setModalSuccessCart(!props.modalSuccessCart)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Successfully booked!</DialogTitle>
            <DialogContent>
                <DialogContentText>Proceed to My Cart?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to="/movies"><Button>No, Book Another Tickets</Button></Link>
                <Button variant="contained" color="secondary" onClick={() => props.history.push(`/usercart/id=${props.userId}`)}>Yes, to My Cart</Button>
            </DialogActions>
        </Dialog>
    )
}

export default withRouter(ModalSuccessCart)
