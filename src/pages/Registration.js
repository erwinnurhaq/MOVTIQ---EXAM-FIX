import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../redux/allAction';



function Registration() {

    const reg = useSelector(state => state.userData.registered);
    const dispatch = useDispatch();

    const initialStateRegUser = { full_name: '', email: '', username: '', password: '', confirmPass: '' }
    const [regUserInput, setRegUserInput] = useState(initialStateRegUser);

    let fullNameArr = regUserInput.full_name.split(' ')
    let first_name = fullNameArr[0];
    let last_name = fullNameArr.slice(1, fullNameArr.length).join(' ');

    // RegEx variable
    const minChar = new RegExp(/^(?=.{8,})/);
    const minNum = new RegExp(/^(?=.*\d)/)
    const minLowCase = new RegExp(/^(?=.*[a-z])/)
    const minUpCase = new RegExp(/^(?=.*[A-Z])/)

    //check form for appropriate characters
    let nameChecked = minChar.test(regUserInput.username);
    let passCharChecked = minChar.test(regUserInput.password);
    let passNumChecked = minNum.test(regUserInput.password);
    let passLowCaseChecked = minLowCase.test(regUserInput.password);
    let passUpCaseChecked = minUpCase.test(regUserInput.password);

    // registration handler
    const regHandler = (e) => {
        e.preventDefault();
        let isNotBlankForm = true;
        let isAllPass = false;
        //check form not blank
        for (let i in regUserInput) {
            if (regUserInput[i] === '') {
                isNotBlankForm = false;
            }
        }
        //check appropriate characters is all OK
        if (nameChecked
            && passCharChecked
            && passNumChecked
            && passLowCaseChecked
            && passUpCaseChecked) {
            isAllPass = true;
        }
        //check is all OK and do register
        if (isNotBlankForm && isAllPass) {
            if (regUserInput.password === regUserInput.confirmPass) {
                dispatch(checkUser({
                    first_name: first_name,
                    last_name: last_name,
                    email: regUserInput.email,
                    username: regUserInput.username,
                    password: regUserInput.password
                }));
                setRegUserInput(initialStateRegUser);
            } else {
                alert('Password is not match!')
            }
        } else {
            alert('Please fill the form correctly!')
        }
    }


    return (
        <div className="registration-container">
            <div className={`regsuccess-wrapper ${reg ? null : 'hidden'}`}>
                <h1>Congratulations! You are a member!</h1>
                <p>{`Please login first on the form above and have a nice day :)`}</p>
            </div>
            <form className="form-wrapper">
                <p className="form-title">Join Us!</p>
                <div className="form-input">
                    <TextField
                        margin="dense"
                        label="Your full name"
                        id="full-name"
                        type="text"
                        fullWidth
                        value={regUserInput.full_name}
                        onChange={e => setRegUserInput({ ...regUserInput, full_name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Your email"
                        id="email"
                        type="email"
                        fullWidth
                        value={regUserInput.email}
                        onChange={e => setRegUserInput({ ...regUserInput, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Your username (min. 8 characters)"
                        id="username"
                        type="text"
                        fullWidth
                        value={regUserInput.username}
                        onChange={e => setRegUserInput({ ...regUserInput, username: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Your password"
                        id="password"
                        type="password"
                        fullWidth
                        value={regUserInput.password}
                        onChange={e => setRegUserInput({ ...regUserInput, password: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm password"
                        id="confirm-password"
                        type="password"
                        fullWidth
                        value={regUserInput.confirmPass}
                        onChange={e => setRegUserInput({ ...regUserInput, confirmPass: e.target.value })}
                    />
                    <div className="text-check-valid">
                        <div>Password should at least contain:</div>
                        <div style={{ color: passCharChecked ? 'lightgreen' : '' }}>- 8 characters</div>
                        <div style={{ color: passNumChecked ? 'lightgreen' : '' }}>- A number</div>
                        <div style={{ color: passLowCaseChecked ? 'lightgreen' : '' }}>- A lowercased character</div>
                        <div style={{ color: passUpCaseChecked ? 'lightgreen' : '' }}>- An uppercased character</div>
                    </div>
                </div>
                <div className="button-container">
                    <Button variant='contained' onClick={regHandler}>Register</Button>
                </div>
            </form>
        </div>
    )
}


export default withRouter(Registration);