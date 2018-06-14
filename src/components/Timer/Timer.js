import React, {Component} from 'react';
import {Howl} from 'howler';
import moment from 'moment';


class Timer extends Component {
    // state: timeLeft and timerState:__timerDuration must be equal
    // (in future i may found better solution)
    state = {
        started: false,
        timeLeft: 10000,
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
        if (Math.floor(this.state.timeLeft / 1000) === 0) {
            this.setState(() => ({started: false}));
            this.playSound();
            this.stopCountdown();
        }
    };

    onClickHandler = () => {
        // use setState optional callback to start or stop timer
        this.setState((prevState) => ({started: !prevState.started}), () => {
            if (this.state.started) {
                this.startCountdown();
            } else {
                this.stopCountdown();
            }
        });
    };

    //accepts boolean argument to differentiate
    // between new timer or started from componentDidUpdate()
    startCountdown(startNewTimer = true) {
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
                <button onClick={this.onClickHandler}>{this.state.started ? 'Stop' : 'Start'}</button>
                {/*<button onClick={this.onResetHan}>Stop</button>*/}
            </div>
        );
    }
}

export default Timer;