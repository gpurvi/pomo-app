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
            timePassed: 0,
            sessionName: ""
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
                timerEndAt,
                timerStarted,
                timerPaused,
                timerPausedAt,
                timerStartedAt
            } = sessionState;

            // init timer from localStorage
            if (timerStarted) {
                const timePassed = new Date().valueOf() - timerStartedAt;
                console.log(timePassed);
                // started and not paused
                if (timePassed > 0 && !timerPaused) {
                    this.setState(() => ({
                        ...sessionState,
                        timerStarted: true,
                        timerPaused: false,
                        timePassed
                    }));
                }
                // started and paused
                if (timerPaused) {
                    this.setState(() => ({
                        ...sessionState,
                        timerStarted: true,
                        timerPaused: true,
                        timePassed: timerPausedAt - timerStartedAt
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
                this.setState(() => ({...state}));
                // include timePassed because it is only needed for localStorage
                localStorage.setItem('sessionState', JSON.stringify({...state, timePassed: 0}));
            })
            .catch((e) => console.log(e));
    }

    startPauseClickHandler() {
        this.setState((prevState) => {
            const sessionState = JSON.parse(localStorage.getItem('sessionState'));

            //start timer
            if (!prevState.timerStarted && !prevState.timerPaused) {
                console.log('start called');
                const timerStartedAt = new Date().valueOf();
                const timerEndAt = sessionState.timerDuration + timerStartedAt;
                const modifiedSessionState = {
                    ...sessionState,
                    timerStarted: true,
                    sessionName: this.state.sessionName,
                    timerStartedAt,
                    timerEndAt
                };
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerStarted: !prevState.timerStarted};
            }

            // pause timer
            if (prevState.timerStarted && !prevState.timerPaused) {
                console.log('pause called');
                const modifiedSessionState = {
                    ...sessionState,
                    timerPausedAt: new Date().valueOf(),
                    timerPaused: true
                };
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerPaused: true};
            }

            // resume timer
            if (prevState.timerStarted && prevState.timerPaused) {
                console.log('resume called');
                console.log('timesPassed', (sessionState.timerPausedAt - sessionState.timerStartedAt));
                const timerEndAt = new Date().valueOf() +
                    sessionState.timerDuration -
                    (sessionState.timerStartedAt - sessionState.timerPausedAt);
                const timerStartedAt = new Date().valueOf();
                const modifiedSessionState = {
                    ...sessionState,
                    timerPaused: false,
                    timerPausedAt: 0,
                    timerEndAt,
                    timerStartedAt
                    // timerEndAt
                    // timerStartedAt:
                };
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerPaused: false};
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
            timerStartedAt: 0,
            timerPausedAt: 0
        };
        this.setState(() => ({...modifiedSessionState}));
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
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
                    displayTime={this.state.timerDuration - this.state.timePassed}
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