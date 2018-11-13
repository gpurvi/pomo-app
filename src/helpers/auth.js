import axios from 'axios';

export const setToken = token => {
    setLocalStorageToken(token);
    setHttpToken(token);
};

const setLocalStorageToken = token => {
    if (!token) {
        localStorage.removeItem('authtoken');
    }

    localStorage.setItem('authtoken', token);
};

const setHttpToken = (token) => {
    if (!token) {
        axios.defaults.headers.common['Authorization'] = null;
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const checkTokenExists = () => {
    const authtoken = localStorage.getItem('authtoken');
    if (!authtoken) {
        return Promise.reject(new Error('invalid token'));
    }
    return Promise.resolve(authtoken)
};