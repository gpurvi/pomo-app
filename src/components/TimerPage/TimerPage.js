import React from 'react';
import DateSessions from "./DateSessions";
import isSameDate from './../../utils/isSameDate';
import format from 'date-fns/format';
import {getSessions, postSessions} from "../common/apiCalls";
import TimerBlock from "./TimerBlock";
import TimerButtons from "./TimerButtons";
import DropdownV1 from "../common/DropdownV1";

export default class TimerPage extends React.Component {

    constructor(props) {
        super(props);

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.onStopTimerHandler = this.onStopTimerHandler.bind(this);
        this.getSessions = this.getSessions.bind(this);
        this.postSession = this.postSession.bind(this);
        this.state = {
            date: new Date(),
            sessions: [],
            error: ''
        };
    }

    async componentDidMount() {
        await this.getSessions(format(new Date(), 'YYYY-MM-DD'));
    }

    async onStopTimerHandler({sessionName, duration}) {
        const session = await this.postSession(sessionName, duration);
        if (isSameDate(this.state.date, new Date())) {
            this.setState((prevState) => ({sessions: prevState.sessions.concat(session)}));
        }
    }

    async postSession(sessionName, duration) {
        try {
            return await postSessions(sessionName, duration);
        } catch (err) {
            this.setState(() => ({error: err.message}))
        }
    }

    async getSessions(date) {
        try {
            const sessions = await getSessions(date);
            this.setState(() => ({sessions}))
        } catch (err) {
            this.setState(() => ({error: err.message}))
        }
    }

    async onDateChangeHandler(date) {
        this.setState(() => ({date}));
        if (date !== null) {
            await this.getSessions(format(date, 'YYYY-MM-DD'));
        }
    }

    render() {
        return (
            <div className='container mt-4'>
                <div className="row justify-content-center">
                    <div className='col-md-8 col-lg-6'>
                        <DropdownV1/>
                    </div>
                </div>
                <TimerBlock endTimer={this.onStopTimerHandler}/>
                <TimerButtons endTimer={this.onStopTimerHandler}/>
                <hr className='mt-5 border-dark'/>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <DateSessions
                            date={this.state.date}
                            sessions={this.state.sessions}
                            onDateChange={this.onDateChangeHandler}/>
                    </div>
                </div>

            </div>
        );
    }

}