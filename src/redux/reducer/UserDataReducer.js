const initialState = {
    loading: false,
    user: {},
    isLogin: false,
    error: '',
    registered: false,
    transactions: [],
}

const UserDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_USERS_SUCCESS':
            console.log('login success');
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLogin: true,
                error: '',
                registered: true
            }
        case 'FETCH_USERS_ERROR':
            console.log(action.payload)
            return {
                ...state,
                error: action.payload
            }
        case 'USER_LOGOUT':
            console.log('logout success');
            return {
                ...state,
                loading: false,
                user: {},
                isLogin: false,
                error: '',
                registered: false
            }
        case 'REG_SUCCESS':
            console.log('register success');
            return {
                ...state,
                loading: false,
                registered: true
            }
        case 'REG_FAILED':
            console.log('register failed');
            return {
                ...state,
                loading: false,
                registered: false
            }
        case 'FETCH_USER_TRANSACTION':
            console.log('fetch user transaction success');
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        default:
            return state
    }
}

export default UserDataReducer;