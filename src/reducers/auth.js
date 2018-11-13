// import {SET_AUTHENTICATED, /*SET_USER_DATA*/} from '../actions/auth';
// //
// // export default (state = defaultAuthState, action) => {
// //     switch (action.type) {
// //         case 'LOGIN':
// //             return {
// //                 uid: action.uid
// //             };
// //         case 'LOGOUT':
// //             return {};
// //         default:
// //             return state;
// //     }
// // };
//
//
// export default (state = {authenticated: false}, action) => {
//     switch (action.type) {
//         case SET_AUTHENTICATED:
//             return {
//                 ...state,
//                 authenticated: action.authenticated
//             };
//         default:
//             return state;
//     }
// };

export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};