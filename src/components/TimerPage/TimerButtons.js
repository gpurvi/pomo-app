import React from "react";
import {connect} from 'react-redux';
import Dropdown from '../../components/common/Dropdown';
import StartPauseButton from "../buttons/StartPauseButton";
import StopButton from "../buttons/StopButton";
import {changeName, pauseTimer, resumeTimer, startTimer, stopTimer} from "../../actions/timer";

class TimerButtons extends React.Component {
    constructor(props) {
        super(props);

        this.startPauseClickHandler = this.startPauseClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onStopHandler = this.onStopHandler.bind(this);
    }

    onChangeHandler(e) {
        const sessionName = e.target.value;
        this.props.dispatch(changeName(sessionName));
    }

    onStopHandler(e) {
        // if it was pressed so e exists and time passed calculate and stop timer without break
        if (e) {
            if (this.props.timerStarted) {
                this.props.dispatch(stopTimer());
                const duration = this.props.timerDuration - this.props.timeLeft;
                this.props.endTimer({
                    sessionName: this.props.sessionName,
                    duration
                });
            } else if (this.props.breakTimerStarted) {
                this.props.dispatch(stopTimer());
            }
        }
    }

    startPauseClickHandler() {
        // when break timer running do nothing
        if (!this.props.breakTimerStarted) {
            //start timer
            if (!this.props.timerStarted) {
                const timerEndAt = this.props.timerDuration + new Date().valueOf();
                const breakTimerEndAt = timerEndAt + this.props.breakDuration;
                const sessionName = this.props.sessionName;
                this.props.dispatch(startTimer({timerEndAt, breakTimerEndAt, sessionName}));
            }

            // pause timer
            if (this.props.timerStarted && !this.props.timerPaused) {
                this.props.dispatch(pauseTimer(this.props.timeLeft));
            }

            // resume timer
            if (this.props.timerStarted && this.props.timerPaused) {
                const timerEndAt = new Date().valueOf() + this.props.timeLeft;
                const breakTimerEndAt = timerEndAt + this.props.breakDuration;
                this.props.dispatch(resumeTimer({timerEndAt, breakTimerEndAt}));
            }
        }
    }

    render() {
        const timerRunning = (this.props.timerStarted && !this.props.timerPaused);
        const timerStarted = this.props.timerStarted || this.props.breakTimerStarted;
        return (
            <div>
                <Dropdown
                    timerStarted={timerStarted}
                    onChangeHandler={this.onChangeHandler}
                    sessionName={this.props.sessionName}
                />
                <div>
                    <StartPauseButton
                        breakTimerStarted={this.props.breakTimerStarted}
                        startPauseClickHandler={this.startPauseClickHandler}
                        timerRunning={timerRunning}
                    />
                    <StopButton
                        onStopHandler={this.onStopHandler}
                        timerStarted={timerStarted}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(TimerButtons);