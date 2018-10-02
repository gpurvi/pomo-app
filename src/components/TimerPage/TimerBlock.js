import React from 'react';
import {connect} from 'react-redux';
import Timer from "./../../components/TimerPage/Timer";
import {
    tick,
    startBreakTimer,
    stopTimer,
} from "../../actions/timer";

class TimerBlock extends React.Component {
    constructor(props) {
        super(props);

        this.onStopHandler = this.onStopHandler.bind(this);
        this.onTickHandler = this.onTickHandler.bind(this);
    }

    onStopHandler() {
        if (this.props.breakTimerStarted === false) {
            //start break timer
            const breakTimerEndAt = this.props.breakDuration + new Date().valueOf();
            this.props.dispatch(startBreakTimer({breakTimerEndAt}));
            const duration = this.props.timerDuration;
            this.props.endTimer({
                sessionName: this.props.sessionName,
                duration
            });
        } else {
            // end break timer
            this.props.dispatch(stopTimer());
        }
    }

    onTickHandler() {
        this.props.dispatch(tick());
    }

    render() {
        const displayTime = (this.props.timerStarted || this.props.breakTimerStarted) ?
            this.props.timeLeft : this.props.timerDuration;
        return (
            <Timer
                displayTime={displayTime}
                breakTimerStarted={this.props.breakTimerStarted}
                timerStarted={this.props.timerStarted}
                timerPaused={this.props.timerPaused}
                onTimerEndHandler={this.onStopHandler}
                onTick={this.onTickHandler}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(TimerBlock);