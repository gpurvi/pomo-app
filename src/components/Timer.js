import React, {Component} from 'react';
import {Howl} from 'howler';
import moment from 'moment';


class Timer extends Component {
    state = {
        started: false,
        timerDuration: 5000,
        timeLeft: 5000,
        endTime: 0
    };
    timerId = undefined;
    //to keep internal started state of timer to mirror started state of component
    __started = false;

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


    onClickHandler = () => {
        this.setState((prevState) => ({started: !prevState.started}));
        this.__started = !this.__started;
        if (this.__started) {
            this.startCountdown();
        } else {
            // this.setState(() => ({
            //     time: moment().add(5000, 'ms').valueOf()
            // }));
            // clearInterval(this.timerId);
        }
    };

    startCountdown = () => {
        this.setState(() => ({
            endTime: (new Date().valueOf() + this.state.timerDuration)
        }));
        this.timerId = setInterval(() => {
            this.setState((prevState) => ({
                timeLeft: prevState.endTime - new Date().valueOf()
            }));
            // if (this.state.time === 0) {
            //     this.setState(() => ({
            //         time: 5,
            //         started: false
            //     }));
            //     clearInterval(this.timerId);
            //     this.playSound();
            //     localStorage.setItem('started', JSON.stringify(this.state.started));
            // }
        }, 1000);
        // localStorage.setItem('endTime', this.calculateEndTime());
        // localStorage.setItem('started', JSON.stringify(this.state.started));
    };

    // calculateEndTime = () => {
    //     return JSON.stringify(moment().add(5, 's').valueOf());
    // };
    //
    // playSound = () => {
    //     const sound = new Howl({
    //         src: ['/sounds/bell.mp3']
    //     });
    //     sound.play();
    // };
    //
    displayTime = () => {
        if (this.state.started) {
            return moment(this.state.timeLeft).format('mm:ss');
        }
        return moment(this.state.timerDuration).format('mm:ss');
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