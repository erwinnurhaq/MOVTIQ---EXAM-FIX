import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

//redux
import { useSelector } from 'react-redux';

//components
import ModalChangePass from '../components/ModalChangePass';
import ModalWarning from '../components/ModalWarning';



function Profile(props) {

    const user = useSelector(state => state.userData.user);
    const isLogin = useSelector(state => state.userData.isLogin);
    const [modalChangePass, setModalChangePass] = useState(false);
    const [modalSuccessChangePass, setModalSuccessChangePass] = useState(false);

    if (isLogin === false) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className="profile-container">
                <div className="profile-wrapper">
                    <div className="biodata-container">
                        <div className="biodata-item">
                            <div className="title">First Name</div>
                            <div className="value">: {user.first_name}</div>
                        </div>
                        <div className="biodata-item">
                            <div className="title">Last Name</div>
                            <div className="value">: {user.last_name}</div>
                        </div>
                        <div className="biodata-item">
                            <div className="title">Email Address</div>
                            <div className="value">: {user.email}</div>
                        </div>
                        <div className="biodata-item">
                            <div className="title">Username</div>
                            <div className="value">: {user.username}</div>
                        </div>
                        <div className="biodata-item">
                            <div className="title">Password</div>
                            <div className="value">: {user.password.substr(0, 1)}****</div>
                        </div>
                        <div className="btn-container">
                            <Button variant="outlined" className="btn-changepass" onClick={() => setModalChangePass(!modalChangePass)}>Change Password</Button>
                            <Button variant="contained" color="secondary" onClick={() => props.history.push('/usertickets')}>See My Tickets</Button>
                        </div>
                    </div>
                    <div className="img-container">
                        <img src={require('../img/blank-profile-picture.jpg')} alt="profile-pic" />
                        <Button>
                            CHANGE PICTURE
                            <PhotoLibraryIcon />
                        </Button>
                    </div>
                </div>
                <div className='white-side'></div>
                <ModalChangePass
                    user={user}
                    modalChangePass={modalChangePass}
                    setModalChangePass={setModalChangePass}
                    modalSuccessChangePass={modalSuccessChangePass}
                    setModalSuccessChangePass={setModalSuccessChangePass}
                />
                <ModalWarning
                    show={modalSuccessChangePass}
                    setShow={setModalSuccessChangePass}
                    text={'Password changed successfully'}
                />
            </div>
        )
    }
}

export default withRouter(Profile);
