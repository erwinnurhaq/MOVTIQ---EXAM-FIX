import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';



function ModalSuccessCheckout(props) {

    return (
        <Dialog open={props.modalSuccessCheckout} onClose={() => props.setModalSuccessCheckout(!props.modalSuccessCheckout)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Checkout Success!</DialogTitle>
            <DialogContent>
                <DialogContentText>Back to Home Page?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.history.push(`/usertickets/id=${props.userId}`)}>No, Go to My Tickets</Button>
                <Link to="/"><Button variant="contained" color="secondary">Yes</Button></Link>
            </DialogActions>
        </Dialog>
    )
}

export default withRouter(ModalSuccessCheckout)
