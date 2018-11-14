import {SET_AUTHENTICATED} from '../actions/auth';

export default (state = {authenticated: false}, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.authenticated
            };
        default:
            return state;
    }
};

