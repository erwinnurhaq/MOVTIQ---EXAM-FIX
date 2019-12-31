import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';



function ModalWarning({ show, setShow, text }) {
    return (
        <Dialog open={show} onClose={() => setShow(!show)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Yep!</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => setShow(!show)} >OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalWarning
