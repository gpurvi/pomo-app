// import axios from 'axios';
// import {setToken, checkTokenExists} from "../helpers/auth";
// import {initApp} from "./timer";
// // import {firebase, googleAuthProvider} from '../firebase/firebase';
// // export const SET_USER_DATA = 'SET_USER_DATA';
// export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
//
// export const setAuthenticated = (authenticated) => ({
//     type: SET_AUTHENTICATED,
//     authenticated
// });
//
// const fetchUser = () => {
//     return axios.get('/api/me')
//         .then(({data: {data}}) => Promise.resolve(data))
//         .catch(error => Promise.reject(error));
// };
//
// export const signInUser = (credentials) => dispatch => {
//     return axios.post('/signin', credentials).then(({data: {data, meta}}) => {
//
//         setToken(/*meta.token*/'123');
//         // dispatch(setUserData(data));
//         dispatch(setAuthenticated(true));
//         return Promise.resolve({data, meta});
//     }).catch(error => {
//         return Promise.reject(error);
//     });
// };
//
// export const clearAuth = () => dispatch => {
//     setToken(null);
//     // dispatch(setUserData(null));
//     dispatch(setAuthenticated(false));
// };
//
//
// export const logoutUser = () => dispatch => {
//     return axios.post('/api/logout')
//         .then(response => {
//             dispatch(clearAuth());
//         })
//         .catch(anyError => {
//             dispatch(clearAuth());
//         });
// };
//
//
// export const initAuthFromExistingToken = () => dispatch => {
//     checkTokenExists().then(token => {
//         setToken(token);
//         initApp();
//         dispatch(setAuthenticated(true));
//
//         //     fetchUser().then(data => {
//         //         // dispatch(setUserData(data));
//         //         dispatch(setAuthenticated(true));
//         //         // cb();
//         //     }).catch(anyError => {
//         //         dispatch(clearAuth());
//         //         // cb();
//         //     });
//     }).catch(anyError => {
//         dispatch(clearAuth());
//         // cb();
//     });
// };

// import {firebase, googleAuthProvider} from '../firebase/firebase';

export const login = (uid = 13) => {
//for dev server use this approach
    localStorage.setItem('auth', JSON.stringify(true));
    return {
        type: 'LOGIN',
        uid
    }
};

// export const startLogin = () => {
//     return () => {
//         return firebase.auth().signInWithPopup(googleAuthProvider);
//     };
// };

export const logout = () => {
    //for dev server use this approach
    localStorage.setItem('auth', JSON.stringify(false));
    return {
        type: 'LOGOUT'
    }
};


// export const startLogout = () => {
//     return () => {
//         return firebase.auth().signOut();
//     };
// };