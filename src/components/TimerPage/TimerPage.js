import React from 'react';
import SessionNameTimerBlock from "./SessionNameTimerBlock";
import DateSessions from "./DateSessions";
import moment from 'moment';
import {getSessions, postSessions, getState, putState} from "./../apiCalls";

export default class TimerPage extends React.Component {

    constructor(props) {
        super(props);

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.changeTimerStateOnServer = this.changeTimerStateOnServer.bind(this);
        this.getSessions = this.getSessions.bind(this);
        this.putSessionState = this.putSessionState.bind(this);
        this.initStateFromServer = this.initStateFromServer.bind(this);
        this.postSession = this.postSession.bind(this);
        this.state = {
            sessions: [],
            error: ''
        };
    }

    async componentDidMount() {
        await this.getSessions(moment().format('YYYY-MM-DD'));
    }

    async initStateFromServer() {
        try {
            return await getState();
        } catch (err) {
            this.setState(() => ({error: err.message}))
        }
    }

    async changeTimerStateOnServer(mode, modifiedSessionState, sessionName = '', duration = 0) {
        if (mode === 'simple') {
            await this.putSessionState(modifiedSessionState);
        } else if (mode === 'session') {
            // sending state and session to server both in one time
            await this.putSessionState(modifiedSessionState);
            const session = await this.postSession(sessionName, moment().format('YYYY-MM-DD'), duration);
            this.setState((prevState) => ({sessions: prevState.sessions.concat(session)}));
        } else if (mode === 'break') {
            await this.putSessionState(modifiedSessionState);
        }
    }

    async putSessionState(modifiedSessionState) {
        try {
            return await putState(modifiedSessionState);
        } catch (err) {
            this.setState(() => ({error: err.message}))
        }
    }

    async postSession(sessionName, date, duration) {
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
        const formatDate = moment(date).format('YYYY-MM-DD');
        await this.getSessions(formatDate);
    }

    render() {
        return (
            <div>
                <SessionNameTimerBlock
                    initStateFromServer={this.initStateFromServer}
                    changeTimerStateOnServer={this.changeTimerStateOnServer}
                />
                <DateSessions
                    sessionData={this.state.sessions}
                    onDateChange={this.onDateChangeHandler}/>
            </div>
        );
    }

}