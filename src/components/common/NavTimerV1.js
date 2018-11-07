import React from 'react';
import {connect} from 'react-redux';
import {postSessions} from "./apiCalls";
import TimerBlock from "../TimerPage/TimerBlock";

class NavTimerV1 extends React.Component {

    constructor(props) {
        super(props);

        this.onStopTimerHandler = this.onStopTimerHandler.bind(this);
        this.postSession = this.postSession.bind(this);
        this.state = {
            error: ''
        };
    }

    async onStopTimerHandler({sessionName, duration}) {
        await this.postSession(sessionName, duration);
    }

    async postSession(sessionName, duration) {
        try {
            await postSessions(sessionName, duration);
        } catch (err) {
            this.setState(() => ({error: err.message}))
        }
    }

    render() {
        const {timerStarted, timerPaused, breakTimerStarted, location} = this.props;
        const showTimer = ((timerStarted && !timerPaused) || breakTimerStarted) && (location.pathname !== '/timer');
        return (
            <React.Fragment>
                {showTimer &&
                <span className="d-none d-md-inline ml-4 navbar-text text-danger font-weight-bold">
                    {timerStarted ? 'Session timer: ' : 'Break timer: '}
                    <TimerBlock
                        small={true}
                        endTimer={this.onStopTimerHandler}
                    />
                </span>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.timer
});

export default connect(mapStateToProps)(NavTimerV1);
