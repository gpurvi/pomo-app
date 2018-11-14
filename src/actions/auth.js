import Http from './../utils/Http';
import {setToken} from '../helpers/auth';
import {clearLocaleStorage} from "../helpers/auth";

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const setAuthenticated = (authenticated) => ({
    type: SET_AUTHENTICATED,
    authenticated
});

export const signInUser = (credentials) => async dispatch => {
    const response = await Http.post('/login', credentials);
    setToken('123token');
    dispatch(setAuthenticated(true));

    return response
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
