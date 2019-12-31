const initialState = {
    loading: false,
    transactions: [],
    error: '',
}

const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TRANSACTIONS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_TRANSACTIONS_SUCCESS':
            console.log('login success');
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'FETCH_TRANSACTIONS_ERROR':
            console.log(action.payload)
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default TransactionReducer;