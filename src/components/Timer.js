import React, {Component} from 'react';
import moment from 'moment';
import {Howl} from 'howler';
// import {connect} from 'react-redux';
// import {timerStarted} from './../actions/appActions';
//
//
// class Timer extends Component {
//     // state: timeLeft and timerState:__timerDuration must be equal
//     // (in future i may found better solution)
//     state = {
//         started: false,
//         timeLeft: this.props.timerDuration
//     };
//     //internal timer state
//     timerState = {
//         __timerId: undefined,
//         __timerDuration: this.props.timerDuration
//     };
//
//     componentDidMount() {
//         console.log(this.props.timerDuration);
//         const timeLeft = JSON.parse(localStorage.getItem('timerEnd')) - new Date().valueOf();
//         if (timeLeft > 0) {
//             this.setState(() => ({
//                 timeLeft,
//                 started: true
//             }));
//             this.props.onMountedRunning();
//             this.startCountdown(false);
//         }
//     };
//
//
//     componentDidUpdate(prevProps, prevState) {
//         // initial start from outside
//         if (this.props.startTimer && !this.state.started) {
//             this.setState(() => ({started: true}));
//             this.startCountdown();
//         }
//         //
//         if (!this.props.startTimer && this.state.started) {
//             this.setState(() => ({started: false}));
//             // this.playSound();
//             this.stopCountdown();
//         }
//         if (Math.floor(this.state.timeLeft / 1000) === 0) {
//             this.setState(() => ({started: false}));
//             this.playSound();1
//             this.stopCountdown();
//         }
//     };
//
//
//     //accepts boolean argument to differentiate
//     // between new timer or started from componentDidUpdate()
//     startCountdown(startNewTimer = true) {
//         this.props.dispatch(timerStarted());
//         this.props.onTimerStart();
//         if (startNewTimer) {
//             this.saveEndTime();
//         }
//         this.timerState.__timerId = setInterval(() => {
//             this.setState((prevState) => ({
//                 timeLeft: prevState.timeLeft - 1000
//             }));
//         }, 1000);
//     };
//
//     stopCountdown() {
//         this.props.onTimerStop();
//         this.setState(() => ({
//             timeLeft: this.timerState.__timerDuration
//         }));
//         clearInterval(this.timerState.__timerId);
//         localStorage.setItem('timerEnd', JSON.stringify(0));
//     };
//
//     playSound() {
//         const sound = new Howl({
//             src: ['/sounds/bell.mp3']
//         });
//         sound.play();
//     };
//
//     saveEndTime() {
//         const endTime = this.timerState.__timerDuration + new Date().valueOf();
//         localStorage.setItem('timerEnd', JSON.stringify(endTime));
//     }
//
//     displayTime() {
//         return moment(this.state.timeLeft).format('mm:ss');
//     };
//
//     render() {
//         return (
//             <div>
//                 <h1>{this.displayTime()}</h1>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         timerDuration: state.timerDuration
//     }
// };
//
// export default connect(mapStateToProps)(Timer);

export default class Timer extends Component {
    // object to keep timer internal data
    timerState = {
        __timerId: undefined
    };

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
                <h1>{moment(this.props.displayTime).format('mm:ss')}</h1>
            </div>
        );
    }
}