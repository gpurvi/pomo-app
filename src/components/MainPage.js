import React, {Component} from 'react';
import './MainPage.css';
import Timer from './Timer';
import LabelsManager from "./LabelsManager";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimer: false,
            value: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.timerStarted = this.timerStarted.bind(this);
        this.timerStopped = this.timerStopped.bind(this);
        this.timerRunning = this.timerRunning.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        const label = JSON.parse(localStorage.getItem('label'));
        if (label.length > 0) {
            this.setState({value: label});
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleClick() {
        this.setState((prevState) => ({
            startTimer: !prevState.startTimer
        }), () => {
            if (this.state.startTimer) {
                localStorage.setItem('label', JSON.stringify(this.state.value));
            }
        });

    }

    timerStarted() {
        console.log('started timer');
    }

    timerStopped() {
        this.setState(() => ({
            startTimer: false
        }));
    }

    timerRunning() {
        this.setState(() => ({
            startTimer: true
        }));
    }

    render() {
        return (
            <div className="MainPage">
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <Timer
                    timerDuration={10000}
                    startTimer={this.state.startTimer}
                    onTimerStart={this.timerStarted}
                    onTimerStop={this.timerStopped}
                    onMountedRunning={this.timerRunning}
                />
                <button onClick={this.handleClick}>{this.state.startTimer ? 'Stop' : 'Start'}</button>
                <LabelsManager/>
            </div>
        );
    }
}

