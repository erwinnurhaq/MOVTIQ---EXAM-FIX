import { combineReducers } from 'redux';
import MovieReducer from './reducer/MovieReducer';
import UserDataReducer from './reducer/UserDataReducer';
import TransactionReducer from './reducer/TransactionReducer';

const allReducer = combineReducers({
    movieData: MovieReducer,
    userData: UserDataReducer,
    transactionData: TransactionReducer
})

export default allReducer;