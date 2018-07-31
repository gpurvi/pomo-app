import React from 'react';
import SessionNameTimerBlock from "./SessionNameTimerBlock";
import DateSessions from "./DateSessions";
import moment from 'moment';

export default class TimerPage extends React.Component {

    constructor(props) {
        super(props);

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.onStopHandler = this.onStopHandler.bind(this);

        this.state = {
            sessions: []
        };
    }

    componentDidMount() {
        this.getSessions(moment().format('YYYY-MM-DD'));
    }

    onStopHandler(sessionName, duration) {
        this.postSession(sessionName, moment().format('YYYY-MM-DD'), duration)
            .then(() => {
                //TODO currently i need timeOut because when stoped by timer it doesn't fetch
                setTimeout(() => {
                    this.getSessions(moment().format('YYYY-MM-DD'));
                }, 500);

            })
            .catch((e) => console.log(e));
    }

    postSession(sessionName, date, duration) {
        const url = ` http://localhost:3000/sessions`;
        const init = {
            method: "POST",
            body: JSON.stringify({sessionName, date, duration}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, init);
    }

    getSessions(date) {
        const url = ` http://localhost:3000/sessions?date=${date}`;
        fetch(url)
            .then((res) => res.json())
            .then((sessions) => this.setState(() => ({sessions})))
            .catch((e) => console.log(e));
    }

    onDateChangeHandler(date) {
        const formatDate = moment(date).format('YYYY-MM-DD');
        this.getSessions(formatDate);
    }

    render() {
        return (
            <div>
                <SessionNameTimerBlock
                    onStop={this.onStopHandler}
                />
                <DateSessions
                    sessionData={this.state.sessions}
                    onDateChange={this.onDateChangeHandler}/>
            </div>
        );
    }

}