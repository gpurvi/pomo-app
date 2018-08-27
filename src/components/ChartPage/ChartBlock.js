import React from 'react';
import ChartInter from "./ChartInter";
import moment from "moment";


export default class ChartBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            sessions: [],
            durations: [],
            maxDate: new Date(),
            minDate: moment().subtract(10, 'month').toDate(),
            date: moment().toDate(), // toDate because of datepicker
            fetchedDate: null, //state which changes when data is fetched, need for chart to show right data
            nextDisabled: false,
            prevDisabled: false
        };

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onDateChangeClickHandler = this.onDateChangeClickHandler.bind(this);
        this.buttonDisabler = this.buttonDisabler.bind(this);
    }


    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const prevDate = moment(prevState.date);
        const nowDate = moment(this.state.date);
        const type = this.props.type;
        // console.log(prevDate, nowDate);
        // after date is updated fetch new data
        // isValid because it is possible to get invalid date from DatePicker
        if (nowDate.isValid()) {
            if (!prevDate.isSame(nowDate)) {
                this.fetchData();
            }
            this.buttonDisabler(nowDate, prevDate, type);
        } else if (!nowDate.isValid()) {
            if (!this.state.nextDisabled || !this.state.prevDisabled) {
                this.setState(() => ({
                    prevDisabled: true,
                    nextDisabled: true
                }));
            }
        }
    }


    buttonDisabler(nowDate, prevDate, type) {
        const isSameEquality = type === 'line' ? 'month' : 'year';
        let prevDisabledState, nextDisabledState;
        if (!prevDate.isValid()) {
            prevDisabledState = this.state.prevDisabled;
            nextDisabledState = this.state.nextDisabled;
        } else if (prevDate.isValid()) {
            prevDisabledState = !this.state.prevDisabled;
            nextDisabledState = !this.state.nextDisabled;
        }
        if (nowDate.isSame(moment(this.state.minDate), isSameEquality) && prevDisabledState) {
            this.setState(() => ({
                prevDisabled: true,
                nextDisabled: false
            }));
        } else if (nowDate.isSame(moment(this.state.maxDate), isSameEquality) && nextDisabledState) {
            this.setState(() => ({
                prevDisabled: false,
                nextDisabled: true
            }));
        } else if (!nowDate.isSame(moment(this.state.minDate), isSameEquality) &&
            !nowDate.isSame(moment(this.state.maxDate), isSameEquality) &&
            (this.state.prevDisabled || this.state.nextDisabled)) {
            this.setState(() => ({
                nextDisabled: false,
                prevDisabled: false
            }));
        }
    }

    getDummyData(date, type) {
        let sessionDurations = [];
        if (type === 'line') {
            const daysInMonth = date.daysInMonth();
            for (let i = 1; i <= daysInMonth; i++) {
                if (i % 2 === 0) {
                    const rand = Math.floor((Math.random() * 30) + 10);
                    sessionDurations.push({
                        date: i,
                        sessions: rand,
                        durations: rand / 5
                    });
                }
            }
        } else if (type === 'bar') {
            const yearLength = 12;
            for (let i = 1; i <= yearLength; i++) {
                const rand = Math.floor((Math.random() * 150) + 10);
                sessionDurations.push({
                    date: i,
                    sessions: rand,
                    durations: rand / 5
                });
            }
        }
        return sessionDurations;
    }

    fetchData() {
        const date = moment(this.state.date);
        const sessionDurations = this.getDummyData(date, this.props.type);
        this.setState(() => ({
            ...this.normalizeData(sessionDurations, date),
            fetchedDate: date
        }));

    }

    normalizeData(data, date) {
        let o = {sessions: [], durations: []};
        if (this.props.type === 'line') {
            o.labels = [];
            const daysInMonth = date.daysInMonth();
            for (let i = 1; i <= daysInMonth; i++) {
                o.labels.push(i);
                const _item = data.find((item) => item.date === i);
                if (_item !== undefined) {
                    let {sessions, durations} = _item;
                    o.sessions.push(sessions);
                    o.durations.push(durations);
                } else {
                    o.sessions.push(0);
                    o.durations.push(0);
                }
            }
        } else if (this.props.type === 'bar') {
            for (let i = 1; i <= 12; i++) {
                const _item = data.find((item) => item.date === i);
                if (_item !== undefined) {
                    let {sessions, durations} = _item;
                    o.sessions.push(sessions);
                    o.durations.push(durations);
                } else {
                    o.sessions.push(0);
                    o.durations.push(0);
                }
            }
        }
        return o;
    }

    onDateChangeHandler(date) {
        this.setState(() => ({date}));
    }

    onDateChangeClickHandler(e) {
        const action = e.target.dataset.attr;
        const lengthDate = this.props.type === 'line' ? 'month' : 'year';
        if (action === 'prev') {
            this.setState((prevState) => ({
                date: moment(prevState.date).subtract(1, lengthDate).toDate()
            }));
        } else if (action === 'next') {
            this.setState((prevState) => ({
                date: moment(prevState.date).add(1, lengthDate).toDate()
            }));
        }
    }

    render() {
        return (
            <ChartInter
                header={this.props.header}
                type={this.props.type}
                fetchedDate={this.state.fetchedDate}
                date={this.state.date}
                sessions={this.state.sessions}
                durations={this.state.durations}
                sessionsLabel={this.props.sessionsLabel}
                durationsLabel={this.props.durationsLabel}
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
                labels={this.state.labels}
                nextDisabled={this.state.nextDisabled}
                prevDisabled={this.state.prevDisabled}
                onDateChange={this.onDateChangeHandler}
                onDateChangeClick={this.onDateChangeClickHandler}
            />
        );
    }
}