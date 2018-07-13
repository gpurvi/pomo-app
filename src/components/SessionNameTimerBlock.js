import React from 'react';
import Timer from "./Timer";
import {SessionName} from "./SessionName";
import StartPauseButton from "./StartPauseButton";
import StopButton from "./StopButton";

class SessionNameTimerBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerDuration: this.props.defaultTimerDuration,
            timerStarted: false,
            timerPaused: false,
            timePassed: 0,
            sessionName: this.props.defaultSessionName
        };

        this.startPauseClickHandler = this.startPauseClickHandler.bind(this);
        this.onStopHandler = this.onStopHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onTickHandler = this.onTickHandler.bind(this);
    }

    componentDidMount() {
        //get all saved state from storage to resume previous state
        const timerStarted = JSON.parse(localStorage.getItem('timerStarted'));
        const sessionName = JSON.parse(localStorage.getItem('sessionName'));
        let timerEnd, timeLeft, timerPaused, timerPausedAt;
        //lazy load variables
        if (timerStarted) {
            timerEnd = JSON.parse(localStorage.getItem('timerEnd'));
            timeLeft = timerEnd - new Date().valueOf();
            timerPaused = JSON.parse(localStorage.getItem('timerPaused'));
            timerPausedAt = JSON.parse(localStorage.getItem('timerPausedAt'));
        }

        // started and not paused
        if (timeLeft > 0 && timerStarted && !timerPaused) {
            this.setState(() => ({
                timerStarted: true,
                timerPaused: false,
                timerDuration: timeLeft
            }));
        }
        // started and paused
        if (timerStarted && timerPaused) {
            this.setState(() => ({
                timerStarted: true,
                timerPaused: true,
                timerDuration: timerEnd - timerPausedAt
            }));
        }
        if (sessionName !== null) {
            this.setState(() => ({
                sessionName
            }));
        }
    }

    startPauseClickHandler() {
        this.setState((prevState) => {
            //start timer
            if (!prevState.timerStarted && !prevState.timerPaused) {
                const endTime = this.state.timerDuration + new Date().valueOf();
                localStorage.setItem('timerEnd', JSON.stringify(endTime));
                localStorage.setItem('timerStarted', JSON.stringify(true));
                localStorage.setItem('sessionName', JSON.stringify(this.state.sessionName));
                return {timerStarted: !prevState.timerStarted};
            }
            // pause timer
            if (prevState.timerStarted && !prevState.timerPaused) {
                localStorage.setItem('timerPausedAt', JSON.stringify(new Date().valueOf()));
                localStorage.setItem('timerPaused', JSON.stringify(true));
                return {timerPaused: true};
            }
            // resume timer
            if (prevState.timerStarted && prevState.timerPaused) {
                localStorage.setItem('timerPaused', JSON.stringify(false));
                return {timerPaused: false};
            }
        });
    }

    onStopHandler() {
        this.setState(() => ({
            timerStarted: false,
            timerPaused: false,
            timerDuration: this.props.defaultTimerDuration,
            timePassed: 0
        }));
        localStorage.setItem('timerStarted', JSON.stringify(false));
        localStorage.setItem('timerPaused', JSON.stringify(false));
    }

    onTickHandler() {
        this.setState((prevState) => ({
            timePassed: prevState.timePassed + 1000
        }));
    }

    onChangeHandler(e) {
        const sessionName = e.target.value;
        this.setState(() => ({
            sessionName
        }));
    }

    render() {
        const timerRunning = (this.state.timerStarted && !this.state.timerPaused);
        return (
            <div>
                <Timer
                    timerDuration={this.state.timerDuration}
                    timerStarted={this.state.timerStarted}
                    timerPaused={this.state.timerPaused}
                    timePassed={this.state.timePassed}
                    onTimerEndHandler={this.onStopHandler}
                    onTick={this.onTickHandler}
                />
                <SessionName
                    onChangeHandler={this.onChangeHandler}
                    sessionName={this.state.sessionName}
                />
                <div>
                    <StartPauseButton
                        startPauseClickHandler={this.startPauseClickHandler}
                        timerRunning={timerRunning}
                    />
                    <StopButton
                        onStopHandler={this.onStopHandler}
                        timerStarted={this.state.timerStarted}
                    />
                </div>
            </div>
        );
    }
}

export default SessionNameTimerBlock;