import React from 'react';
import moment from 'moment';


class Timer extends React.Component {
    state = {
        started: false,
        time: 5
    };
    timerStarted = false;
    timerId = undefined;

    // componentDidMount(){
    //     console.log(this.state.started);
    // }
    // componentDidUpdate(){
    //     console.log(this.state.started);
    // }

    onClickHandler = () => {
        this.setState((prevState) => ({started: !prevState.started}));
        this.timerStarted = !this.timerStarted;
        if (this.timerStarted) {
            this.startCountdown();
        } else {
            this.setState(() => ({
                time: 5
            }));
            clearInterval(this.timerId);
        }
    };

    startCountdown = () => {
        this.timerId = setInterval(() => {
            this.setState((prevState) => ({
                time: --prevState.time
            }));
            // if (this.state.time === 0) {
            //     this.setState(() => ({
            //         time: 5,
            //         started: false
            //     }));
            //     clearInterval(this.timerId);
            // }
        }, 1000);
    };


    render() {
        return (
            <div>
                <h1>{this.state.time}</h1>
                <button onClick={this.onClickHandler}>{this.state.started ? 'Stop' : 'Start'}</button>
                {/*<button onClick={this.onResetHan}>Stop</button>*/}
            </div>
        );
    }
}

export default Timer;