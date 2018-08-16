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
            breakDuration: 0,
            breakTimerStarted: false,
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
    }

    componentDidMount() {
        // if session data and timer state is in localStorage use it otherwise get from server
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        if (sessionState !== null) {
            //get all saved state from storage to resume previous state
            const {
                timerStarted,
                timerPaused,
                breakTimerStarted,
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
            } else if (breakTimerStarted) {
                // if break timer is started
                const timeLeft = sessionState.timerEndAt - new Date().valueOf();
                // started and not paused
                if (timeLeft > 0) {
                    this.setState(() => ({
                        ...sessionState,
                        breakTimerStarted: true,
                        timeLeft
                    }));
                }
            } else {
                // init state from localeStorage if timer  is not running
                this.setState(() => ({...sessionState}));
            }
        } else {
            this.props.initStateFromServer().then((state) => {
                if ((state.timerStarted === true && state.timerPaused !== true) || state.breakTimerStarted) {
                    this.setState(() => ({
                        ...state,
                        timeLeft: state.timerEndAt - new Date().valueOf()
                    }));
                } else {
                    this.setState(() => ({...state}));
                }
                localStorage.setItem('sessionState', JSON.stringify({...state}));
            });
        }
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
                this.props.changeTimerStateOnServer('simple', modifiedSessionState);
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
                this.props.changeTimerStateOnServer('simple', modifiedSessionState);
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
                this.props.changeTimerStateOnServer('simple', modifiedSessionState);
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerPaused: false, timerEndAt};
            }
        });
    }

    onStopHandler(e) {
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        let modifiedSessionState;
        // if it was pressed so e exists and time passed calculate and stop timer without break
        if (e) {
            modifiedSessionState = {
                ...sessionState,
                breakTimerStarted: false,
                timerStarted: false,
                timerPaused: false,
                timerEndAt: 0,
                timeLeft: 0
            };
            // if was stopped session timer
            if (this.state.timerStarted) {
                this.props.changeTimerStateOnServer('session',
                    modifiedSessionState,
                    this.state.sessionName,
                    this.state.timerDuration - this.state.timeLeft);
            } else if (this.state.breakTimerStarted) {
                this.props.changeTimerStateOnServer('break', modifiedSessionState);
            }
        } else {
            // after session timer start break timer
            if (this.state.breakTimerStarted === false) {
                const timerEndAt = this.state.breakDuration + new Date().valueOf();
                modifiedSessionState = {
                    ...sessionState,
                    breakTimerStarted: true,
                    timerStarted: false,
                    timerPaused: false,
                    timeLeft: this.state.breakDuration,
                    timerEndAt
                };
                this.props.changeTimerStateOnServer('session',
                    modifiedSessionState, this.state.sessionName,
                    this.state.timerDuration);
            } else {
                // end break timer
                modifiedSessionState = {
                    ...sessionState,
                    breakTimerStarted: false,
                    timerEndAt: 0,
                    timeLeft: 0
                };
                this.props.changeTimerStateOnServer('break', modifiedSessionState);
            }
        }
        // this.changeTimerStateOnServer(modifiedSessionState);
        this.setState(() => ({...modifiedSessionState}));
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
    }

    onTickHandler() {
        console.log("timer");
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
        const displayTime = (this.state.timerStarted || this.state.breakTimerStarted) ?
            this.state.timeLeft : this.state.timerDuration;
        return (
            <div>
                <Timer
                    displayTime={displayTime}
                    breakTimerStarted={this.state.breakTimerStarted}
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
                        timerStarted={this.state.timerStarted || this.state.breakTimerStarted}
                    />
                </div>
            </div>
        );
    }
}

export default SessionNameTimerBlock;