export const timeLeftInit = (state) => {
    let {
        timerStarted,
        timerEndAt,
        timerPaused,
        timeLeft,
        breakTimerStarted,
        breakTimerEndAt
    } = state;
    if (timerStarted === true && timerPaused === false) {
        timeLeft = timerEndAt - new Date();
    } else if (breakTimerStarted === true) {
        timeLeft = breakTimerEndAt - new Date();
    }
    return timeLeft;
};