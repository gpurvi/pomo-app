import React from 'react';
import moment from 'moment';
import {postSessions} from "./apiCalls";
import TimerBlock from "./../TimerPage/TimerBlock";

export default class TimerBlockWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.onStopTimerHandler = this.onStopTimerHandler.bind(this);
        this.postSession = this.postSession.bind(this);
        this.state = {
            error: ''
        };
    }

    async onStopTimerHandler({sessionName, duration}) {
        await this.postSession(sessionName, moment().format('YYYY-MM-DD'), duration);
    }

    async postSession(sessionName, date, duration) {
        try {
            await postSessions(sessionName, duration);
        } catch (err) {
            this.setState(() => ({error: err.message}))
        }
    }

    render() {
        return (
            <div>
                <TimerBlock endTimer={this.onStopTimerHandler}/>
            </div>
        );
    }

}