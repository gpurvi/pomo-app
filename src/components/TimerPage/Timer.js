import React, {Component} from 'react';
import format from 'date-fns/format';
import {Howl} from 'howler';

export default class Timer extends Component {
    // object to keep timer internal data
    constructor(props) {
        super(props);
        this.timerState= {
            __timerId: undefined
        };
    }

    componentDidMount(){
        if(this.props.timerStarted && !this.props.timerPaused){
            this.startCountdown();
        } else if(this.props.breakTimerStarted){
            this.startCountdown();
        }
    }

    componentDidUpdate(prevProps) {
        // stops timer when time ends
        if (Math.floor((this.props.displayTime) / 1000) < 0) {
            this.playSound();
            clearInterval(this.timerState.__timerId);
            this.props.onTimerEndHandler();
        }
        //starts and stops timer
        if ((prevProps.timerStarted !== this.props.timerStarted) && this.props.timerStarted) {
            this.startCountdown();
        } else if ((prevProps.timerStarted !== this.props.timerStarted) && !this.props.timerStarted) {
            clearInterval(this.timerState.__timerId);
        }
        // pauses running timer and resumes
        if ((prevProps.timerPaused !== this.props.timerPaused) && this.props.timerPaused) {
            clearInterval(this.timerState.__timerId);
        } else if ((prevProps.timerPaused !== this.props.timerPaused)
            && !this.props.timerPaused
            && this.props.timerStarted) {
            this.startCountdown();
        }
        //starts break timer
        if ((prevProps.breakTimerStarted !== this.props.breakTimerStarted) && this.props.breakTimerStarted) {
            this.startCountdown();
        } else if ((prevProps.breakTimerStarted !== this.props.breakTimerStarted) && !this.props.breakTimerStarted) {
            clearInterval(this.timerState.__timerId);
        }
    };

    componentWillUnmount(){
        clearInterval(this.timerState.__timerId);
    }

    startCountdown() {
        this.timerState.__timerId = setInterval(() => {
            this.props.onTick();
        }, 1000);
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
                <h1>{format(this.props.displayTime, 'mm:ss')}</h1>
            </div>
        );
    }
}