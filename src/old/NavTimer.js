import React from 'react';
import TimerBlockWrapper from "./TimerBlockWrapper";
import {connect} from 'react-redux';

const NavTimer = ({timerStarted, timerPaused, breakTimerStarted, location}) => {
    if (((timerStarted && !timerPaused) || breakTimerStarted) && (location.pathname !== '/timer')) {
        return (
            <TimerBlockWrapper small={true}/>
        );
    } else {
        // then it does not return empty div tag
        return null;
    }
};

const mapStateToProps = ({timerStarted, breakTimerStarted, timerPaused}) => ({
    timerStarted, breakTimerStarted, timerPaused
});

export default connect(mapStateToProps)(NavTimer);
