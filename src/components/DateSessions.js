import React from 'react';
import DatePicker from "./DatePicker";
import SessionsTable from "./SessionsTable";
import moment from "moment/moment";
//
// const dummyData1 = [
//     {sessionName: "app", count: 5, timeInMillis: 0},
//     {sessionName: "guru", count: 4, timeInMillis: 6000000},
//     {sessionName: "zeta", count: 1, timeInMillis: 1500000},
//     {sessionName: "null", count: 0, timeInMillis: 3600000 * 2},
// ];
//
// const dummyData2 = [
//     {sessionName: "app", count: 5, timeInMillis: 0},
// ];
//
// const dummyData3 = [
//     {sessionName: "gu1221ru", count: 4, timeInMillis: 6000000},
//     {sessionName: "zetdfdsfa", count: 1, timeInMillis: 1500000},
//     {sessionName: "nudsfdsfll", count: 0, timeInMillis: 3600000 * 2},
// ];

export default class DateSessions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionData: [],
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
                    this.state.sessionData.length ?
                        <SessionsTable sessionData={this.state.sessionData}/> :
                        <h1>There is no data!</h1>
                }
            </div>
        );
    }
}
