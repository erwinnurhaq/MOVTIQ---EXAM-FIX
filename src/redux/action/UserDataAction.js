import Axios from 'axios';
import { API_URL } from '../../support/API_URL';

//------------------------------------------------
export const fetchUsersRequest = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
}
export const fetchUsersSuccess = (users) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        payload: users
    }
}
export const fetchUsersError = (error) => {
    return {
        type: 'FETCH_USERS_ERROR',
        payload: error
    }
}
export const userLogout = () => {
    return {
        type: 'USER_LOGOUT',
    }
}
export const regSuccess = () => {
    return {
        type: 'REG_SUCCESS',
    }
}
export const regFailed = () => {
    return {
        type: 'REG_FAILED',
    }
}
export const fetchUserTransaction = (transactions) => {
    return {
        type: 'FETCH_USER_TRANSACTION',
        payload: transactions
    }
}
//------------------------------------------------



export function loginAct(inputUser) {
    return dispatch => {
        dispatch(fetchUsersRequest());
        if (inputUser.username.includes("@")) {
            Axios.get(`${API_URL}/users?email=${inputUser.username}&password=${inputUser.password}`)
                .then(resp => {
                    if (resp.data.length > 0) {
                        dispatch(fetchUsersSuccess(...resp.data));
                        localStorage.setItem('username', resp.data[0].username);
                    } else {
                        alert('User is not found!')
                    }
                })
                .catch(error => {
                    dispatch(fetchUsersError(error));
                })
        } else {
            Axios.get(`${API_URL}/users?username=${inputUser.username}&password=${inputUser.password}`)
                .then(resp => {
                    if (resp.data.length > 0) {
                        dispatch(fetchUsersSuccess(...resp.data));
                        localStorage.setItem('username', resp.data[0].username);
                    } else {
                        alert('User is not found!')
                    }
                })
                .catch(error => {
                    dispatch(fetchUsersError(error));
                })
        }
    }
}

export function logoutAct() {
    return dispatch => {
        dispatch(userLogout());
        localStorage.removeItem('username');
    }
}

export function getLocal() {
    return dispatch => {
        dispatch(fetchUsersRequest());
        let username = localStorage.getItem('username');
        console.log(username)
        if (username) {
            Axios.get(`${API_URL}/users?username=${username}`)
                .then(resp => {
                    if (resp.data.length > 0) {
                        dispatch(fetchUsersSuccess(...resp.data));
                        dispatch(userTransaction(resp.data[0].username));
                    } else {
                        alert('User is not found!')
                    }
                })
                .catch(error => {
                    dispatch(fetchUsersError(error));
                })
        };
    }
}

export function regUser(regUserInput) {
    return dispatch => {
        dispatch(fetchUsersRequest());
        Axios.post(`${API_URL}/users`, { ...regUserInput, role: 'user', cart: [] })
            .then(resp => {
                console.log(resp.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export function checkUser(regUserInput) {
    return dispatch => {
        dispatch(fetchUsersRequest());
        Axios.get(`${API_URL}/users?username=${regUserInput.username}`)
            .then(resp => {
                if (resp.data.length > 0) {
                    alert('Username is already exist');
                    dispatch(regFailed())
                } else {
                    dispatch(regUser(regUserInput));
                    dispatch(regSuccess())
                }
            })
            .catch(error => {
                dispatch(fetchUsersError(error));
            })
    }
}

export function userTransaction(username) {
    return dispatch => {
        Axios.get(`${API_URL}/transactions?username=${username}`)
            .then(resp => {
                console.log(resp.data);
                dispatch(fetchUserTransaction(resp.data))
            })
            .catch(err => console.log(err))
    }
}

export function changeUserPass(userId, newPass) {
    return dispatch => {
        Axios.patch(`${API_URL}/users/${userId}`, { password: newPass })
            .then(resp => {
                console.log('pass changed successfully');
                console.log(resp.data);
                dispatch(getLocal())
            })
            .catch(err => console.log(err))
    }
}