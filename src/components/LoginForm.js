import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TimelineLite } from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import { Button, TextField } from '@material-ui/core';

//redux
import { useDispatch } from 'react-redux';
import { loginAct } from '../redux/allAction';

//for fix gsap bug
const C = CSSPlugin;


const LoginComponent = (props) => {

    const dispatch = useDispatch();

    const [inputUser, setInputUser] = useState({ username: '', password: '' });
    let loginForm = useRef(null);
    let formGroup = useRef(null);
    let formBackground = useRef(null);


    // login button function
    const loginHandler = (e) => {
        e.preventDefault();
        if (inputUser.username && inputUser.password) {
            dispatch(loginAct(inputUser));
            setInputUser({ username: '', password: '' }); //clear form
            props.setClick({ initial: false, clicked: null }); //set clicked null
            props.history.push('/')
        } else {
            alert('Please fill the form!')
        }
    }

    //component did mount
    useEffect(() => {
        console.log(props.click.clicked)
        //login form effect
        const tlLoginForm = new TimelineLite({ reversed: true })
        tlLoginForm.from(loginForm, 0, {
            opacity: 0,
            css: { display: 'none' }
        }).to(loginForm, 0, {
            opacity: 1,
            css: { display: 'block', pointerEvents: 'all' }
        }).fromTo([formBackground, formGroup], 0.5, {
            opacity: 0,
            height: 0,
            y: -15,
            ease: "power3.inOut",
        }, {
            opacity: 1,
            height: "100%",
            y: 0,
            stagger: {
                amount: 0.1
            }
        })
        if (props.click.initial === false) {
            loginForm.style.display = 'none';
        } else if (props.click.clicked === true) {
            tlLoginForm.play()
        } else if (props.click.clicked === false) {
            tlLoginForm.reverse();
            loginForm.style.pointerEvents = 'none';
        }

    }, [props.click.initial, props.click.clicked])

    return (
        <div ref={el => loginForm = el} className='login-container'>
            <div ref={el => formBackground = el} className="form-background"></div>
            <div ref={el => formGroup = el} className='form-container'>
                <div className="login-wrapper">
                    <div className="form-input">
                        <TextField
                            margin="dense"
                            label="Username or Email"
                            id="username"
                            type="text"
                            fullWidth
                            value={inputUser.username}
                            onChange={e => setInputUser({ ...inputUser, username: e.target.value })}
                        />

                        <TextField
                            margin="dense"
                            label="Password"
                            id="password"
                            type="password"
                            fullWidth
                            value={inputUser.password}
                            onChange={e => setInputUser({ ...inputUser, password: e.target.value })}
                        />
                    </div>
                    <div className="form-action-group">
                        <Button variant="contained" onClick={loginHandler}>LOGIN</Button>
                        <p>Not a member yet? Please <Link to="/registration" className="reg-link">| Register |</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default withRouter(LoginComponent);