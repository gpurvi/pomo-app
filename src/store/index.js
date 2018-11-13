import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import timerReducer from '../reducers/timer';
import authReducer from "../reducers/auth";
// import

export default createStore(
    combineReducers({
        timer: timerReducer,
        auth: authReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

// import {combineReducers, createStore, applyMiddleware} from "redux";
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import expensesReducer from '../reducers/expenses';
// import filtersReducer from '../reducers/filters';
// import authReducer from '../reducers/auth';
//
//
// export default () => {
//     return createStore(
//         combineReducers({
//             expenses: expensesReducer,
//             filters: filtersReducer,
//             auth: authReducer
//         }),
//         composeWithDevTools(applyMiddleware(thunk))
//     );
// };