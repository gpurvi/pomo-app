import React from 'react';
import DatePicker from "./DatePicker";
import SessionsTable from "./SessionsTable";
import moment from "moment/moment";

export default class DateSessions extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: moment(),
            focused: null,
            buttonClick: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
    }


    onDateChangeHandler(date) {
        this.setState(() => ({date}));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.date.format('D M YYYY') !== prevState.date.format('D M YYYY') || this.state.buttonClick) {
            // console.log(this.state.date.format('D M YYYY'));
            this.props.onDateChange(this.state.date);
            this.setState(() => ({buttonClick: false}));
        }
    }

    onClickHandler(action) {
        if (action === 'prev') {
            this.setState((prevState) => ({
                date: prevState.date.subtract(1, 'day'),
                buttonClick: true
            }));
        } else if (action === 'next') {
            this.setState((prevState) => ({
                date: prevState.date.add(1, 'day'),
                buttonClick: true
            }));
        } else if (action === 'now') {
            this.setState(() => ({
                date: moment()
            }));
        }
    }

    render() {
        return (
            <div>
                <h1>Sessions</h1>
                <DatePicker
                    date={this.state.date}
                    onDateChange={this.onDateChangeHandler}
                    onClick={this.onClickHandler}
                />
                {
                    this.props.sessionData.length ?
                        <SessionsTable sessionData={this.props.sessionData}/> :
                        <h1>There is no data!</h1>
                }
            </div>
        );
    }
}
