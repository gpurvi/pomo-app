import React, {Component} from 'react';
import {Howl} from 'howler';
import moment from 'moment';


class Timer extends Component {
    // state: timeLeft and timerState:__timerDuration must be equal
    // (in future i may found better solution)
    state = {
        started: false,
        timeLeft: 10000
    };
    //internal timer state
    timerState = {
        __timerId: undefined,
        __timerDuration: 10000
    };

    componentDidMount() {
        const timeLeft = JSON.parse(localStorage.getItem('timerEnd')) - new Date().valueOf();
        if (timeLeft > 0) {
            this.setState(() => ({
                timeLeft
            }));
            this.startCountdown(false);
        }
    };


    componentDidUpdate(prevProps, prevState) {
        // initial start from outside
        if( this.props.startTimer && !this.state.started){
            this.setState(() => ({started: true}));
            this.startCountdown();
        }
        //
        if(!this.props.startTimer && this.state.started){
            this.setState(() => ({started: false}));
            // this.playSound();
            this.stopCountdown();
        }
        if (Math.floor(this.state.timeLeft / 1000) === 0) {
            this.setState(() => ({started: false}));
            this.playSound();
            this.stopCountdown();
        }
    };


    //accepts boolean argument to differentiate
    // between new timer or started from componentDidUpdate()
    startCountdown(startNewTimer = true) {
        this.props.onTimerStart();
        if (startNewTimer) {
            this.saveEndTime();
        }
        this.timerState.__timerId = setInterval(() => {
            this.setState((prevState) => ({
                timeLeft: prevState.timeLeft - 1000
            }));
        }, 1000);
    };

    stopCountdown() {
        this.props.onTimerStop();
        this.setState(() => ({
            timeLeft: this.timerState.__timerDuration
        }));
        clearInterval(this.timerState.__timerId);
    };

    playSound() {
        const sound = new Howl({
            src: ['/sounds/bell.mp3']
        });
        sound.play();
    };

    saveEndTime() {
        const endTime = this.timerState.__timerDuration + new Date().valueOf();
        localStorage.setItem('timerEnd', JSON.stringify(endTime));
    }

    displayTime() {
        return moment(this.state.timeLeft).format('mm:ss');
    };

    render() {
        return (
            <div>
                <h1>{this.displayTime()}</h1>
            </div>
        );
    }
}

export default Timer;