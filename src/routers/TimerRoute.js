import React from 'react';
import TimerBlockWrapper from "./../components/common/TimerBlockWrapper";
import connect from "react-redux/es/connect/connect";

const TimerRoute = ({timerStarted, timerPaused, breakTimerStarted, location}) => {
    if (((timerStarted && !timerPaused) || breakTimerStarted) && (location.pathname !== '/')) {
        return (
            <TimerBlockWrapper/>
        );
    } else {
        // then it does not return empty div tag
        return null;
    }
};

const mapStateToProps = ({timerStarted, breakTimerStarted, timerPaused}) => ({
    timerStarted, breakTimerStarted, timerPaused
});

export default connect(mapStateToProps)(TimerRoute);
