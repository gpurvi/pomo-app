const timerReducerDefaultState = {
    timerDuration: 0,
    breakDuration: 0,
    breakTimerStarted: false,
    timerStarted: false,
    timerPaused: false,
    timeLeft: 0,
    sessionName: "",
    timerEndAt: 0,
    breakTimerEndAt: 0
};

export default (state = timerReducerDefaultState, action) => {
    switch (action.type) {
        case 'INIT_TIMER':
            return {
                ...state,
                ...action.state
            };
        case 'START_TIMER':
            return {
                ...state,
                timerStarted: true,
                timeLeft: state.timerDuration,
                timerEndAt: action.timerEndAt,
                breakTimerEndAt: action.breakTimerEndAt
            };
        case 'PAUSE_TIMER':
            return {
                ...state,
                timerPaused: true
            };
        case 'RESUME_TIMER':
            return {
                ...state,
                timerPaused: false,
                timerEndAt: action.timerEndAt,
                breakTimerEndAt: action.breakTimerEndAt
            };
        case 'STOP_TIMER':
            return {
                ...state,
                breakTimerStarted: false,
                timerStarted: false,
                timerPaused: false,
                timerEndAt: 0,
                timeLeft: 0,
                breakTimerEndAt: 0
            };
        case 'START_BREAK_TIMER':
            return {
                ...state,
                breakTimerStarted: true,
                timerStarted: false,
                timerPaused: false,
                timeLeft: state.breakDuration,
                breakTimerEndAt: action.breakTimerEndAt
            };
        case 'TICK':
            return {
                ...state,
                timeLeft: state.timeLeft - 1000
            };
        case 'CHANGE_NAME':
            return {
                ...state,
                sessionName: action.sessionName
            };
        case 'ERROR':
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};