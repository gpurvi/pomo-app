import React, {Component} from 'react';
// import format from 'date-fns/format';
import {Howl} from 'howler';
import formatDateUTC from "../../utils/formatDateUTC";

export default class Timer extends Component {
    // object to keep timer internal data
    constructor(props) {
        super(props);
        this.timerState = {
            __timerId: undefined,
            __breakID: undefined
        };

        this._clearInterval = this._clearInterval.bind(this);
        this.startCountdown = this.startCountdown.bind(this);
    }

    componentDidMount() {
        if (this.props.timerStarted && !this.props.timerPaused) {
            this.startCountdown('timer');
        } else if (this.props.breakTimerStarted) {
            this.startCountdown('break');
        }
    }

    componentDidUpdate(prevProps) {
        // stops timer when time ends
        // console.log(Math.floor((this.props.displayTime) / 1000) < 0);
        if (Math.floor((this.props.displayTime) / 1000) < 0) {
            this.playSound();
            this._clearInterval('all');
            this.props.onTimerEndHandler();
        }
        //starts and stops timer
        if ((prevProps.timerStarted !== this.props.timerStarted) && this.props.timerStarted) {
            this.startCountdown('timer');
        } else if ((prevProps.timerStarted !== this.props.timerStarted) && !this.props.timerStarted) {
            this._clearInterval('timer');
            console.log('cleared interval');
        }
        // pauses running timer and resumes
        if ((prevProps.timerPaused !== this.props.timerPaused) && this.props.timerPaused) {
            this._clearInterval('timer');
        } else if ((prevProps.timerPaused !== this.props.timerPaused)
            && !this.props.timerPaused
            && this.props.timerStarted) {
            this.startCountdown('timer');
        }
        //starts break timer
        if ((prevProps.breakTimerStarted !== this.props.breakTimerStarted) && this.props.breakTimerStarted) {
            this.startCountdown('break');
        } else if ((prevProps.breakTimerStarted !== this.props.breakTimerStarted) && !this.props.breakTimerStarted) {
            this._clearInterval('break');
        }
    };

    componentWillUnmount() {
        this._clearInterval('all');
    }

    _clearInterval(type) {
        if (type === 'timer') {
            clearInterval(this.timerState.__timerId);
        } else if (type === 'break') {
            clearInterval(this.timerState.__breakID)
        } else {
            clearInterval(this.timerState.__breakID);
            clearInterval(this.timerState.__timerId);
        }
    }

    startCountdown(type) {
        if (type === 'timer') {
            this.timerState.__timerId = setInterval(() => {
                this.props.onTick();
            }, 1000);
        } else if (type === 'break') {
            this.timerState.__breakID = setInterval(() => {
                this.props.onTick();
            }, 1000);
        }
    };

    playSound() {
        const sound = new Howl({
            src: ['/sounds/bell.mp3']
        });
        sound.play();
    };

    render() {
        return (
            <div>
                <h1>{formatDateUTC(this.props.displayTime)}</h1>
            </div>
        );
    }
}