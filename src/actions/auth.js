import Http from './../utils/Http';
import {setToken, clearLocaleStorage} from '../helpers/auth';
import {initTimer} from "./timer";

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const setAuthenticated = (authenticated) => ({
    type: SET_AUTHENTICATED,
    authenticated
});

export const signInUser = (credentials) => async dispatch => {
    //need to implement token on server
    const response = await Http.post('/login', credentials);

    //todo remove this on proper backend
    //this is for local development server currently, later remove it
    if (response.status = 201) {
        const {data} = await Http.get('/sessionState');
        dispatch(initTimer(data));
    }
    setToken('123token');
    dispatch(setAuthenticated(true));
    return response
    // return new Error();
};

export const clearAuth = () => dispatch => {
    setToken(null);
    dispatch(setAuthenticated(false));
};


export const logoutUser = () => async dispatch => {
    dispatch(clearAuth());
    clearLocaleStorage();
    const response = await Http.post('/logout');
};

export const checkAuth = () => dispatch => {
    const authtoken = localStorage.getItem('authtoken');
    if (authtoken) {
        setToken(authtoken);
        dispatch(setAuthenticated(true));
    } else {
        dispatch(clearAuth());
    }
};
