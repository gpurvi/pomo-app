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