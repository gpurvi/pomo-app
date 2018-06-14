import React, {Component} from 'react';
import './MainPage.css';
import Timer from './Timer/Timer';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimer: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.timerStarted = this.timerStarted.bind(this);
        this.timerStopped = this.timerStopped.bind(this);

    }

    handleClick() {
        this.setState((prevState) => ({
            startTimer: !prevState.startTimer
        }));
    }

    timerStarted() {
        console.log('started timer');
    }

    timerStopped() {
        this.setState(() => ({
            startTimer: false
        }));
    }

    render() {
        return (
            <div className="MainPage">
                <input/>
                <Timer startTimer={this.state.startTimer} onTimerStart={this.timerStarted} onTimerStop={this.timerStopped}/>
                <button onClick={this.handleClick}>Start</button>
            </div>
        );
    }
}

export default MainPage;