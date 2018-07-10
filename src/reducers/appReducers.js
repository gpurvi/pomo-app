const appReducerDefaultState = {
    timerStarted: false,
    timerEnd: 0,
    timerDuration: 10000,
    currentLabel: ''
};

export default (state = appReducerDefaultState, action) => {
    switch (action.type) {
        case 'START_TIMER':
            return {
                ...state,
                timerStarted: true
            };
        case 'STOP_TIMER':
            return {
                ...state,
                timerStarted: false
            };
        case 'SET_END':
            return {
                ...state,
                timerEnd: action.timerEnd
            };
        case 'SET_LABEL':
            return {
                ...state,
                currentLabel: action.label
            };
        default:
            return state;
    }
};