import React from 'react';
import TimerBlockWrapper from "./../components/common/TimerBlockWrapper";
import connect from "react-redux/es/connect/connect";

const TimerRoute = ({timerStarted, breakTimerStarted, location}) => {
    if ((timerStarted || breakTimerStarted) && (location.pathname !== '/')) {
        return (
            <TimerBlockWrapper/>
        );
    } else {
        // then it does not return empty div tag
        return null;
    }
};

const mapStateToProps = ({timerStarted, breakTimerStarted}) => ({
    timerStarted, breakTimerStarted
});

export default connect(mapStateToProps)(TimerRoute);
