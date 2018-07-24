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

    onStopHandler(sessionName, stopTime) {
        this.postSession(sessionName, moment(stopTime).format('YYYY-MM-DD'))
            .then(() => {
                this.getSessions(moment(stopTime).format('YYYY-MM-DD'));
            })
            .catch((e) => console.log(e));
    }

    postSession(sessionName, stopTime) {
        const url = ` http://localhost:3000/sessions`;
        const init = {
            method: "POST",
            body: JSON.stringify({sessionName, stopTime}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(url, init);
    }

    getSessions(date) {
        const url = ` http://localhost:3000/sessions?stopTime=${date}`;
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
                    sessionData={[]}
                    onDateChange={this.onDateChangeHandler}/>
            </div>
        );
    }

}