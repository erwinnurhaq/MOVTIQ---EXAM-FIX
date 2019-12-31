import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';



function modalRemove({ modalRemove, setModalRemove, action, text, selectedRow, setSelectedRow }) {

    const removeHandler = () => {
        action(selectedRow);
        setSelectedRow(null);
        setModalRemove(!modalRemove);
    }

    return (
        <Dialog open={modalRemove} onClose={() => setModalRemove(!modalRemove)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">WARNING</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setModalRemove(!modalRemove)} >No</Button>
                <Button onClick={removeHandler} color="secondary">Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default modalRemove