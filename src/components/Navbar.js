import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, TextField, Fade, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import TheatersIcon from '@material-ui/icons/Theaters';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//redux
import { useSelector, useDispatch } from 'react-redux';

//components
import LoginComponent from './LoginForm';
import { loginAct, logoutAct } from '../redux/allAction';


const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderRadius: '0px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'grey',
    },
    inputRoot: {
        color: 'grey',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '0.85rem',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                color: 'darkcyan',
                fontSize: '0.9rem',
                width: 200,
            },
        },
    },
}));


function Navbar(props) {

    const user = useSelector(state => state.userData.user);
    const isLogin = useSelector(state => state.userData.isLogin);
    const dispatch = useDispatch();

    let selected = user.id;

    const [inputUser, setInputUser] = useState({ username: '', password: '' });

    // login button function
    const loginHandler = (e) => {
        e.preventDefault();
        if (inputUser.username && inputUser.password) {
            dispatch(loginAct(inputUser));
            setInputUser({ username: '', password: '' }); //clear form
            // props.setClick({ initial: false, clicked: null }); //set clicked null
            props.history.push('/')
        } else {
            alert('Please fill the form!')
        }
    }

    //clicked status login btn form
    const [click, setClick] = useState({ initial: false, clicked: null });

    //handle toggle login form
    const handleClickLoginForm = () => {
        if (click.initial === false) {
            setClick({ initial: null, clicked: true });
        } else if (click.clicked) {
            setClick({ ...click, clicked: false });
        } else {
            setClick({ ...click, clicked: true });
        }
    };

    //handle logout
    const handleLogout = () => {
        dispatch(logoutAct());
        props.history.push('/');
        setClick({ initial: false, clicked: null })
    }

    const [invertBg, setInvertBg] = useState(false);

    const bgNavChanger = () => {
        if (window.scrollY > window.innerHeight / 8) {
            setInvertBg(true);
        } else {
            setInvertBg(false)
        }
    }

    //MaterialUI--------------------------------/
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    //End MaterialUI--------------------------------/

    useEffect(() => {
        window.addEventListener('scroll', bgNavChanger);
        props.history.listen(() => { setClick({ ...click, clicked: false }); setOpen(false) });
    }, [props.history, click, open])

    const userMenu = () => {
        return (
            <div className="user-menu">
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <div className="username">{user.username}</div>
                    <AccountCircleIcon />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={() => props.history.push(`/profile`)}><AccountCircleIcon /> Profile</MenuItem>
                                        <MenuItem onClick={() => props.history.push(`/usercart`)}><ShoppingCartIcon /> My Cart</MenuItem>
                                        <MenuItem onClick={() => props.history.push(`/usertickets`)}><TheatersIcon /> My Ticket Transactions</MenuItem>
                                        <MenuItem onClick={handleLogout}><ExitToAppIcon /> Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>)
    }

    const adminMenu = () => {
        return (
            <div className="user-menu">
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <div className="username">{user.username}</div>
                    <AccountCircleIcon />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={() => props.history.push('/moviemanagement')}><TheatersIcon /> Movie Management</MenuItem>
                                        <MenuItem onClick={() => props.history.push('/transactionhistory')}><ListAltIcon /> Transaction History</MenuItem>
                                        <MenuItem onClick={handleClose}><SettingsIcon /> Settings</MenuItem>
                                        <MenuItem onClick={handleLogout}><ExitToAppIcon /> Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>)
    }


    //!MAIN RENDER---------------------------------------------/
    return (
        <div className={`navbar-container ${invertBg ? 'bg-change' : ''}`}>
            <div className="navbar-content">
                <div className="nav-left-container">
                    <img src={require('../img/logo/movtiq_edit.png')} alt="logo" />
                </div>
                <div className="nav-middle-container">
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/movies">MOVIES</Link></li>
                        <li><Link to="/warningdev">CINEMAS</Link></li>
                        <li><Link to="/warningdev">MEMBERSHIP</Link></li>
                    </ul>
                </div >
                <div className="nav-right-container">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Button className={`btn-login ${isLogin ? "hidden" : null}`} onClick={handleClickLoginForm} variant="contained">LOGIN</Button>

                    {isLogin && user.role === 'user' ? userMenu() : isLogin && user.role === 'admin' ? adminMenu() : null}
                </div>
            </div>
            <LoginComponent click={click} setClick={setClick} />
        </div>
    )
}


export default withRouter(Navbar);