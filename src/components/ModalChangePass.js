import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

//redux
import { useDispatch } from 'react-redux';
import { changeUserPass } from '../redux/allAction';


function ModalChangePass({ user, modalChangePass, setModalChangePass, modalSuccessChangePass, setModalSuccessChangePass }) {

    const dispatch = useDispatch();
    const [inputPrevPass, setInputPrevPass] = useState('');
    const [inputNewPass, setInputNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    // RegEx variable
    const minChar = new RegExp(/^(?=.{8,})/);
    const minNum = new RegExp(/^(?=.*\d)/)
    const minLowCase = new RegExp(/^(?=.*[a-z])/)
    const minUpCase = new RegExp(/^(?=.*[A-Z])/)

    //check form for appropriate characters
    let passCharChecked = minChar.test(inputNewPass);
    let passNumChecked = minNum.test(inputNewPass);
    let passLowCaseChecked = minLowCase.test(inputNewPass);
    let passUpCaseChecked = minUpCase.test(inputNewPass);

    const checkNotBlank = () => {
        if (inputPrevPass !== '' &&
            inputNewPass !== '' &&
            confirmPass !== ''
        ) { return true }
    }
    const checkPassChar = () => {
        if (passCharChecked &&
            passNumChecked &&
            passLowCaseChecked &&
            passUpCaseChecked
        ) { return true }
    }
    const checkPrevPass = () => {
        if (user.password === inputPrevPass) { return true }
    }
    const checkConfirmPass = () => {
        if (inputNewPass === confirmPass) { return true }
    }

    const changePassHandler = () => {
        let isNotBlank = checkNotBlank();
        let isCharPass = checkPassChar();
        let isPrevPass = checkPrevPass();
        let isConfirmPass = checkConfirmPass();
        if (isNotBlank && isCharPass && isPrevPass && isConfirmPass) {
            console.log(user.id, inputNewPass);
            dispatch(changeUserPass(user.id, inputNewPass));
            setModalChangePass(!modalChangePass);
            setModalSuccessChangePass(!modalSuccessChangePass);
        } else if (!isNotBlank) {
            alert('Please fill the form correctly!')
        } else if (!isCharPass) {
            alert('Your password is not correct!')
        } else if (!isPrevPass) {
            alert('Your previous password is not correct!')
        } else {
            alert(`Your new password doesn't match!`)
        }
    }

    return (
        <Dialog open={modalChangePass} onClose={() => setModalChangePass(!modalChangePass)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">CHANGE PASSWORD</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill the form below:</DialogContentText>
                <TextField
                    margin="dense"
                    label="Your Previous Password"
                    id="prevpassword"
                    type="password"
                    fullWidth
                    value={inputPrevPass}
                    onChange={e => setInputPrevPass(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="New Password"
                    id="newpassword"
                    type="password"
                    fullWidth
                    value={inputNewPass}
                    onChange={e => setInputNewPass(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Confirm New Password"
                    id="confirmnewpassword"
                    type="password"
                    fullWidth
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                />
                <div className="text-check-valid">
                    <div>Password should at least contain:</div>
                    <div style={{ color: passCharChecked ? 'lightgreen' : '' }}>- 8 characters</div>
                    <div style={{ color: passNumChecked ? 'lightgreen' : '' }}>- A number</div>
                    <div style={{ color: passLowCaseChecked ? 'lightgreen' : '' }}>- A lowercased character</div>
                    <div style={{ color: passUpCaseChecked ? 'lightgreen' : '' }}>- An uppercased character</div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setModalChangePass(!modalChangePass)} >Cancel</Button>
                <Button variant='contained' color="secondary" onClick={changePassHandler}>Save</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalChangePass;