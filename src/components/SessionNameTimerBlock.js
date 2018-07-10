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
            sessionName: this.props.defaultSessionName
        };

        this.startPauseClickHandler = this.startPauseClickHandler.bind(this);
        this.onStopHandler = this.onStopHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        const timeLeft = JSON.parse(localStorage.getItem('timerEnd')) - new Date().valueOf();
        const timerStarted = JSON.parse(localStorage.getItem('timerStarted'));
        const sessionName = JSON.parse(localStorage.getItem('sessionName'));
        if (timeLeft > 0 && timerStarted) {
            this.setState(() => ({
                timerStarted: true,
                timerDuration: timeLeft
            }));
        }
        if (sessionName != null) {
            this.setState(() => ({
                sessionName
            }));
        }
    }

    startPauseClickHandler() {
        this.setState((prevState) => {
            if (!prevState.timerStarted && !prevState.timerPaused) {
                const endTime = this.state.timerDuration + new Date().valueOf();
                localStorage.setItem('timerEnd', JSON.stringify(endTime));
                localStorage.setItem('timerStarted', JSON.stringify(true));
                localStorage.setItem('sessionName', JSON.stringify(this.state.sessionName));
                return {timerStarted: !prevState.timerStarted};
            } else if (prevState.timerStarted && !prevState.timerPaused) {
                return {timerPaused: true};
            } else if (prevState.timerStarted && prevState.timerPaused) {
                return {timerPaused: false};
            }
        });
    }

    onStopHandler() {
        this.setState(() => ({
            timerStarted: false,
            timerPaused: false,
            timerDuration: this.props.defaultTimerDuration,
        }));
        localStorage.setItem('timerStarted', JSON.stringify(false));
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
                    onTimerEndHandler={this.onStopHandler}
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