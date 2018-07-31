import React from 'react';
import Timer from "./Timer";
import {SessionName} from "./SessionName";
import StartPauseButton from "./StartPauseButton";
import StopButton from "./StopButton";

class SessionNameTimerBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerDuration: 0,
            timerStarted: false,
            timerPaused: false,
            timeLeft: 0,
            sessionName: "",
            timerEndAt: 0
        };

        this.startPauseClickHandler = this.startPauseClickHandler.bind(this);
        this.onStopHandler = this.onStopHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onTickHandler = this.onTickHandler.bind(this);
        this.initStateFromServer = this.initStateFromServer.bind(this);
    }

    componentDidMount() {
        // if session data and timer state is in localStorage use it otherwise get from server
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        if (sessionState !== null) {
            //get all saved state from storage to resume previous state
            const {
                timerStarted,
                timerPaused
            } = sessionState;

            // init timer from localStorage
            if (timerStarted) {
                const timeLeft = sessionState.timerEndAt - new Date().valueOf();
                // started and not paused
                if (timeLeft > 0 && !timerPaused) {
                    this.setState(() => ({
                        ...sessionState,
                        timerStarted: true,
                        timerPaused: false,
                        timeLeft
                    }));
                }
                // started and paused
                if (timerPaused) {
                    this.setState(() => ({
                        ...sessionState,
                        timerStarted: true,
                        timerPaused: true,
                        timeLeft: sessionState.timeLeft
                    }));
                }
            } else {
                // init state from localeStorage if timer is not running
                this.setState(() => ({...sessionState}));
            }
        } else {
            this.initStateFromServer();
        }
    }

    initStateFromServer() {
        const url = ` http://localhost:3000/sessionState`;
        fetch(url)
            .then((res) => res.json())
            .then((state) => {
                if (state.timerStarted === true && state.timerPaused !== true) {
                    this.setState(() => ({
                        ...state,
                        timeLeft: state.timerEndAt - new Date().valueOf()
                    }));
                } else {
                    this.setState(() => ({...state}));
                }
                localStorage.setItem('sessionState', JSON.stringify({...state}));
            })
            .catch((e) => console.log(e));
    }

    changeTimerStateOnServer(modifiedSessionState) {
        const url = ` http://localhost:3000/sessionState`;
        const init = {
            method: "PUT",
            body: JSON.stringify(modifiedSessionState),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, init)
            .catch((e) => console.log(e));
    }

    startPauseClickHandler() {
        this.setState((prevState) => {
            const sessionState = JSON.parse(localStorage.getItem('sessionState'));

            //start timer
            if (!prevState.timerStarted && !prevState.timerPaused) {
                const timerEndAt = this.state.timerDuration + new Date().valueOf();
                const modifiedSessionState = {
                    ...sessionState,
                    timerStarted: true,
                    sessionName: this.state.sessionName,
                    timerEndAt
                };
                this.changeTimerStateOnServer(modifiedSessionState);
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {
                    timerStarted: !prevState.timerStarted,
                    timerEndAt,
                    timeLeft: this.state.timerDuration // to not show 00:00 when start timer
                };
            }

            // pause timer
            if (prevState.timerStarted && !prevState.timerPaused) {
                const modifiedSessionState = {
                    ...sessionState,
                    timerPaused: true,
                    timeLeft: this.state.timeLeft
                };
                this.changeTimerStateOnServer(modifiedSessionState);
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerPaused: true};
            }

            // resume timer
            if (prevState.timerStarted && prevState.timerPaused) {
                const timerEndAt = new Date().valueOf() + this.state.timeLeft;
                const modifiedSessionState = {
                    ...sessionState,
                    timerPaused: false,
                    timerEndAt
                };
                this.changeTimerStateOnServer(modifiedSessionState);
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerPaused: false, timerEndAt};
            }
        });
    }

    onStopHandler() {
        this.props.onStop(this.state.sessionName, new Date().valueOf());
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        const modifiedSessionState = {
            ...sessionState,
            timerStarted: false,
            timerPaused: false,
            timerEndAt: 0,
            timeLeft: 0
        };
        this.changeTimerStateOnServer(modifiedSessionState);
        this.setState(() => ({...modifiedSessionState}));
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
    }

    onTickHandler() {
        console.log(this.state.timeLeft);
        this.setState((prevState) => ({
            timeLeft: prevState.timeLeft - 1000
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
        const displayTime = this.state.timerStarted ?
            this.state.timeLeft : this.state.timerDuration;
        return (
            <div>
                <Timer
                    displayTime={displayTime}
                    timerStarted={this.state.timerStarted}
                    timerPaused={this.state.timerPaused}
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