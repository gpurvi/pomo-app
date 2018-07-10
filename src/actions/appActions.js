//actions
//START_TIMER
export const timerStarted = () => ({
    type: 'START_TIMER'
});
//STOP_TIMER
export const timerStoped = () => ({
    type: 'STOP_TIMER'
});

//SET_END
export const setTimerEnd = ({timerEnd = 0} = {}) => ({
    type: 'SET_END',
    timerEnd
});

//SET_LABEL
export const setLabel = ({label = ''} = {}) => ({
    type: 'SET_END',
    label
});
