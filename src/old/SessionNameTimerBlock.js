import React from 'react';
import Timer from "../components/TimerPage/Timer";
import {SessionName} from "./SessionName";
import StartPauseButton from "../components/buttons/StartPauseButton";
import StopButton from "../components/buttons/StopButton";

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
            timerEndAt: 0,
            breakTimerEndAt: 0
        };

        this.startPauseClickHandler = this.startPauseClickHandler.bind(this);
        this.onStopHandler = this.onStopHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onTickHandler = this.onTickHandler.bind(this);
    }

    async componentDidMount() {
        // if session data and timer state is in localStorage use it otherwise get from server
        const sessionState = JSON.parse(localStorage.getItem('sessionState'));
        let sessionTimeLeft, breakTimeLeft;
        if (sessionState !== null) {
            //get all saved state from storage to resume previous state
            const {
                timerStarted,
                timerPaused,
                breakTimerStarted,
                timerEndAt,
                breakTimerEndAt
            } = sessionState;

            // init timer from localStorage
            sessionTimeLeft = timerEndAt - new Date().valueOf();
            breakTimeLeft = breakTimerEndAt - new Date().valueOf();
            if (sessionTimeLeft > 0) {
                if (timerStarted) {
                    // started and not paused
                    if (!timerPaused) {
                        this.setState(() => ({
                            ...sessionState,
                            timerStarted: true,
                            timerPaused: false,
                            timeLeft: sessionTimeLeft
                        }));
                    } else if (timerPaused) {
                        this.setState(() => ({
                            ...sessionState,
                            timerStarted: true,
                            timerPaused: true,
                            timeLeft: sessionState.timeLeft
                        }));
                    }
                }
            } else if (breakTimeLeft > 0) {
                // if break timer is started
                const modifiedSessionState = {
                    ...sessionState,
                    timerStarted: false,
                    timerPaused: false,
                    breakTimerStarted: true,
                    timeLeft: breakTimeLeft
                };
                this.setState(() => ({...modifiedSessionState}));
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
            } else {
                const modifiedSessionState = {
                    ...sessionState,
                    breakTimerStarted: false,
                    timerStarted: false,
                    timerPaused: false,
                    timerEndAt: 0,
                    timeLeft: 0,
                    breakTimerEndAt: 0
                };
                //if break timer was running and there was no time left
                if (breakTimerStarted === true && breakTimeLeft < 0) {
                    this.setState(() => ({...modifiedSessionState}));
                    localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                } else {
                    // init state from localeStorage if timer  is not running
                    this.setState(() => ({...sessionState}));
                }
            }
        } else {
            // get state from server
            // this.props.initStateFromServer().then((state) => {
            //     if ((state.timerStarted === true && state.timerPaused !== true) || state.breakTimerStarted) {
            //         this.setState(() => ({
            //             ...state,
            //             timeLeft: state.timerEndAt - new Date().valueOf()
            //         }));
            //     } else {
            //         this.setState(() => ({...state}));
            //     }
            //     localStorage.setItem('sessionState', JSON.stringify({...state}));
            // });
            const state = await this.props.initStateFromServer();
            //if timer is started then start it locally
            if ((state.timerStarted === true && state.timerPaused !== true) || state.breakTimerStarted) {
                this.setState(() => ({
                    ...state,
                    timeLeft: state.timerEndAt - new Date().valueOf()
                }));
            } else {
                this.setState(() => ({...state}));
            }
            localStorage.setItem('sessionState', JSON.stringify({...state}));
        }
    }

    startPauseClickHandler() {
        this.setState((prevState) => {
            const sessionState = JSON.parse(localStorage.getItem('sessionState'));

            //start timer
            if (!prevState.timerStarted && !prevState.timerPaused) {
                const timerEndAt = this.state.timerDuration + new Date().valueOf();
                const breakTimerEndAt = timerEndAt + this.state.breakDuration;
                const modifiedSessionState = {
                    ...sessionState,
                    timerStarted: true,
                    sessionName: this.state.sessionName,
                    timerEndAt,
                    breakTimerEndAt
                };
                this.props.changeTimerStateOnServer('simple', modifiedSessionState);
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {
                    timerStarted: !prevState.timerStarted,
                    timerEndAt,
                    breakTimerEndAt,
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
                const breakTimerEndAt = timerEndAt + this.state.breakDuration;
                const modifiedSessionState = {
                    ...sessionState,
                    timerPaused: false,
                    timerEndAt,
                    breakTimerEndAt
                };
                this.props.changeTimerStateOnServer('simple', modifiedSessionState);
                localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
                return {timerPaused: false, timerEndAt, breakTimerEndAt};
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
                timeLeft: 0,
                breakTimerEndAt: 0
            };
            // if was stopped session timer
            if (this.state.timerStarted) {
                this.props.changeTimerStateOnServer(
                    'session',
                    modifiedSessionState,
                    this.state.sessionName,
                    this.state.timerDuration - this.state.timeLeft);
            } else if (this.state.breakTimerStarted) {
                this.props.changeTimerStateOnServer('break', modifiedSessionState);
            }
        } else {
            // after session timer start break timer
            if (this.state.breakTimerStarted === false) {
                const breakTimerEndAt = this.state.breakDuration + new Date().valueOf();
                modifiedSessionState = {
                    ...sessionState,
                    breakTimerStarted: true,
                    timerStarted: false,
                    timerPaused: false,
                    timeLeft: this.state.breakDuration,
                    breakTimerEndAt
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
                    timeLeft: 0,
                    breakTimerEndAt: 0
                };
                this.props.changeTimerStateOnServer('break', modifiedSessionState);
            }
        }
        // this.changeTimerStateOnServer(modifiedSessionState);
        this.setState(() => ({...modifiedSessionState}));
        localStorage.setItem('sessionState', JSON.stringify(modifiedSessionState));
    }

    onTickHandler() {
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
                <SessionName
                    onChangeHandler={this.onChangeHandler}
                    sessionName={this.state.sessionName}
                />
                <Timer
                    displayTime={displayTime}
                    breakTimerStarted={this.state.breakTimerStarted}
                    timerStarted={this.state.timerStarted}
                    timerPaused={this.state.timerPaused}
                    onTimerEndHandler={this.onStopHandler}
                    onTick={this.onTickHandler}
                />
                {this.props.full &&
                <div>
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
                }
            </div>
        );
    }
}

export default SessionNameTimerBlock;