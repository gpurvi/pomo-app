import React, {Component} from 'react';
import {Howl} from 'howler';
import moment from 'moment';


class Timer extends Component {
    state = {
        started: false,
        timeLeft: 5000,
    };
    //internal timer state
    timerState = {
        __timerId: undefined,
        __endTime: 0,
        __timerDuration: 5000
    };

    // componentDidMount = () => {
    //     if (JSON.parse(localStorage.getItem('started')) === true) {
    //         this.setState(() => ({
    //             time: moment(JSON.parse(localStorage.getItem('endTime'))).valueOf()
    //         }));
    //     }
    // };
    //
    // componentWillUnmount = () => {
    //
    // };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.timeLeft === 0) {
            this.stopCountdown();
            this.playSound();
        }
    };

    onClickHandler = () => {
        // use setState optional callback to start or stop timer
        this.setState((prevState) => ({started: !prevState.started}), () => {
            if (this.state.started) {
                this.startCountdown()
            } else {
                this.stopCountdown();
            }
        });
    };

    startCountdown() {
        this.timerState.__endTime = (new Date().valueOf() + this.timerState.__timerDuration);
        this.timerState.__timerId = setInterval(() => {
            this.setState((prevState) => ({
                timeLeft: prevState.timeLeft - 1000
            }));
        }, 1000);
        // localStorage.setItem('endTime', this.calculateEndTime());
        // localStorage.setItem('started', JSON.stringify(this.state.started));
    };

    stopCountdown() {
        this.setState(() => ({
            timeLeft: 5000
        }));
        clearInterval(this.timerState.__timerId);
        this.timerState.__endTime = 0;
    };

    playSound() {
        const sound = new Howl({
            src: ['/sounds/bell.mp3']
        });
        sound.play();
    };

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