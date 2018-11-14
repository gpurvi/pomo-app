import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import timerReducer from '../reducers/timer';
import authReducer from "../reducers/auth";

export default createStore(
    combineReducers({
        timer: timerReducer,
        auth: authReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)
