import React from 'react';
import SessionNameTimerBlock from "./SessionNameTimerBlock";
import DateSessions from "./DateSessions";
import moment from 'moment';

export default class TimerPage extends React.Component {

    constructor(props) {
        super(props);

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.changeTimerStateOnServer = this.changeTimerStateOnServer.bind(this);
        this.getSessions = this.getSessions.bind(this);
        this.state = {
            sessions: []
        };
    }

    componentDidMount() {
        this.getSessions(moment().format('YYYY-MM-DD'));
    }

    initStateFromServer() {
        const url = `http://localhost:3000/sessionState`;
        return fetch(url)
            .then((res) => res.json())
            .catch((e) => console.log(e));
    }

    changeTimerStateOnServer(mode, modifiedSessionState, sessionName = '', duration = 0) {
        if (mode === 'simple') {
            this.putSessionState(modifiedSessionState)
                .catch((e) => console.log(e));
        } else if (mode === 'session') {
            this.putSessionState(modifiedSessionState)
                .then(() => {
                    return this.postSession(sessionName, moment().format('YYYY-MM-DD'), duration)
                })
                .then((res) => res.json())
                .then((session) => {
                    this.setState((prevState) => ({sessions: prevState.sessions.concat(session)}));
                })
                .catch((e) => console.log(e));
        } else if (mode === 'break') {
            this.putSessionState(modifiedSessionState)
                .catch((e) => console.log(e));
        }
    }

    putSessionState(modifiedSessionState) {
        const url = 'http://localhost:3000/sessionState';
        const init = {
            method: "PUT",
            body: JSON.stringify(modifiedSessionState),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, init);
        // return fetch(url, init).then((res) => res.text())
        //     .then((status) => document.querySelector("#root").innerHTML=status);
    }

    postSession(sessionName, date, duration) {
        const url = 'http://localhost:3000/sessions';
        const init = {
            method: "POST",
            body: JSON.stringify({sessionName, duration}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, init);
    }

    getSessions(date) {
        const url = `http://localhost:3000/sessions?date=${date}`;
        fetch(url)
            .then((res) => res.json())
            .then((sessions) => this.setState(() => ({sessions})))
    }

    onDateChangeHandler(date) {
        const formatDate = moment(date).format('YYYY-MM-DD');
        this.getSessions(formatDate);
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