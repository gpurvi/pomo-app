import Http from './../utils/Http';

export const setToken = token => {
    setLocalStorageToken(token);
    setHttpToken(token);
};

const setLocalStorageToken = token => {
    if (!token) {
        localStorage.removeItem('authtoken');
    } else {
        localStorage.setItem('authtoken', token);
    }
};

const setHttpToken = (token) => {
    if (!token) {
        Http.defaults.headers.common['Authorization'] = null;
    } else {
        Http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
};

export const clearLocaleStorage = () => {
    localStorage.removeItem('sessionState');
    localStorage.removeItem('appState');
};
