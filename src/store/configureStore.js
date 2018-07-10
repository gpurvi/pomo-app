import {createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import appReducer from '../reducers/appReducers';
// import

export default () => {
    return createStore(
        appReducer,

        composeWithDevTools()
    )
};

