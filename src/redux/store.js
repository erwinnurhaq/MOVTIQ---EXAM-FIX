import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import allReducer from './allReducer';
const initialState = {};
const middlewares = [thunk];


const store = createStore(allReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;