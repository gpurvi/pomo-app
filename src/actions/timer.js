import {putState, getSessionState} from "../components/common/apiCalls";
import {timeLeftInit} from "../utils/timeLeftInit";

//INIT_TIMER
export const initApp = () => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        if (sessionState !== null) {
            // perform check for timer started state and if true init timeLeft
            const timeLeft = timeLeftInit(sessionState);
            dispatch({
                type: 'INIT_TIMER',
                state: {...sessionState, timeLeft}
            });
        } else {
            try {
                const sessionState = await getSessionState();
                // perform check for timer started state and if true init timeLeft
                const timeLeft = timeLeftInit(sessionState);
                dispatch({
                    type: 'INIT_TIMER',
                    state: {...sessionState, timeLeft}
                });
                localStorage.setItem('sessionState', JSON.stringify({...sessionState}));
                // localStorage.setItem('appState', JSON.stringify({...appState}));
            } catch (err) {
                dispatch({
                    type: 'ERROR',
                    error: err.message
                });
            }
        }
    };
};

//START_TIMER
export const startTimer = ({timerEndAt, breakTimerEndAt, sessionName}) => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const modifiedSessionState = {
            ...sessionState,
            timerStarted: true,
            breakTimerStarted: false,
            timerEndAt,
            breakTimerEndAt,
            sessionName
        };
        dispatch({
            type: 'START_TIMER',
            timerStarted: true,
            breakTimerStarted: false,
            timerEndAt,
            breakTimerEndAt
        });
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
        try {
            await putState(modifiedSessionState);
        } catch (err) {
            dispatch({
                type: 'ERROR',
                error: err.message
            });
        }
    };
};

//PAUSE_TIMER
export const pauseTimer = (timeLeft) => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const modifiedSessionState = {
            ...sessionState,
            timerPaused: true,
            timeLeft
        };
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
        dispatch({
            type: 'PAUSE_TIMER'
        });
        try {
            await putState(modifiedSessionState);
        } catch (err) {
            dispatch({
                type: 'ERROR',
                error: err.message
            });
        }
    };
};

//RESUME_TIMER
export const resumeTimer = ({timerEndAt, breakTimerEndAt}) => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const modifiedSessionState = {
            ...sessionState,
            timerPaused: false,
            timerEndAt,
            breakTimerEndAt
        };
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
        dispatch({
            type: 'RESUME_TIMER',
            timerEndAt,
            breakTimerEndAt
        });
        try {
            await putState(modifiedSessionState);
        } catch (err) {
            dispatch({
                type: 'ERROR',
                error: err.message
            });
        }
    };
};

//STOP_TIMER
export const stopTimer = () => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const modifiedSessionState = {
            ...sessionState,
            breakTimerStarted: false,
            timerStarted: false,
            timerPaused: false,
            timerEndAt: 0,
            timeLeft: 0,
            breakTimerEndAt: 0,
            cycleCountRun: 0
        };
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
        dispatch({
            type: 'STOP_TIMER'
        });
        try {
            await putState(modifiedSessionState);
        } catch (err) {
            dispatch({
                type: 'ERROR',
                error: err.message
            });
        }
    };
};

//START_BREAK_TIMER
export const startBreakTimer = ({breakTimerEndAt}) => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const timeLeft = sessionState.breakDuration;
        const modifiedSessionState = {
            ...sessionState,
            breakTimerStarted: true,
            timerStarted: false,
            timerPaused: false,
            timeLeft,
            breakTimerEndAt,
            cycleCount : ++sessionState.cycleCountRun
        };
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
        dispatch({
            type: 'START_BREAK_TIMER',
            breakTimerEndAt
        });
        try {
            await putState(modifiedSessionState);
        } catch (err) {
            dispatch({
                type: 'ERROR',
                error: err.message
            });
        }
    };
};

//TICK
export const tick = () => ({
    type: 'TICK'
});

//CHANGE_NAME
export const changeName = (sessionName) => ({
    type: 'CHANGE_NAME',
    sessionName
});

//ERROR
export const error = (error) => ({
    type: 'ERROR',
    error
});

//CHANGE_TIMER_SETTINGS
export const changeTimerSettings = (setting) => {
    return async (dispatch) => {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const modifiedSessionState = {
            ...sessionState,
            ...setting
        };
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
        dispatch({
            type: 'CHANGE_TIMER_SETTINGS',
            setting
        });
        try {
            await putState(modifiedSessionState);
        } catch (err) {
            dispatch({
                type: 'ERROR',
                error: err.message
            });
        }
    };
};
