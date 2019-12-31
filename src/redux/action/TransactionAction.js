import Axios from 'axios';
import { API_URL } from '../../support/API_URL';

//------------------------------------------------
export const fetchTransactionsRequest = () => {
    return {
        type: 'FETCH_TRANSACTIONS_REQUEST'
    }
}
export const fetchTransactionsSuccess = (transactions) => {
    return {
        type: 'FETCH_TRANSACTIONS_SUCCESS',
        payload: transactions
    }
}
export const fetchTransactionsError = (error) => {
    return {
        type: 'FETCH_TRANSACTIONS_ERROR',
        payload: error
    }
}

//--------------------------------------------------

export function fetchAllTransactions() {
    return dispatch => {
        dispatch(fetchTransactionsRequest());
        Axios.get(`${API_URL}/transactions`)
            .then(resp => {
                console.log('fetch all transaction success');
                dispatch(fetchTransactionsSuccess(resp.data))
            })
            .catch(err => console.log(err))
    }
}