import React from 'react';
import ChartInter from "./ChartInter";
import moment from "moment";
import {getSessionsDurations} from "../apiCalls";

export default class ChartBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            sessions: [],
            durations: [],
            maxDate: moment().toDate(),
            date: moment()/*subtract(2, 'months')*/.toDate(), // toDate because of datepicker
            fetchedDate: null, //state which changes when data is fetched, need for chart to show right data
            nextDisabled: false,
            prevDisabled: false,
            error: ''
        };

        this.line = this.props.type === 'line';

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        // this.fetchData = this.fetchData.bind(this);
        this.onDateChangeClickHandler = this.onDateChangeClickHandler.bind(this);
        this.buttonDisabler = this.buttonDisabler.bind(this);
        this.getSessionData = this.getSessionData.bind(this);
        this.fetchedDataEmpty = this.fetchedDataEmpty.bind(this);
    }


    async componentDidMount() {
        // this.fetchData();
        await this.getSessionData();
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevDate = moment(prevState.date);
        const nowDate = moment(this.state.date);
        // console.log(prevDate, nowDate);
        // after date is updated fetch new data
        // isValid because it is possible to get invalid date from DatePicker
        if (nowDate.isValid()) {
            if (!prevDate.isSame(nowDate)) {
                // this.fetchData();
                await this.getSessionData();
            }
            this.buttonDisabler(nowDate, prevDate);
        } else if (!nowDate.isValid()) {
            if (!this.state.nextDisabled || !this.state.prevDisabled) {
                this.setState(() => ({
                    prevDisabled: true,
                    nextDisabled: true
                }));
            }
        }
    }


    buttonDisabler(nowDate, prevDate) {
        const isSameEquality = this.line ? 'month' : 'year';
        let prevDisabledState, nextDisabledState;
        if (!prevDate.isValid()) {
            prevDisabledState = this.state.prevDisabled;
            nextDisabledState = this.state.nextDisabled;
        } else if (prevDate.isValid()) {
            prevDisabledState = !this.state.prevDisabled;
            nextDisabledState = !this.state.nextDisabled;
        }
        if (nowDate.isSame(moment(this.props.minDate), isSameEquality) && prevDisabledState) {
            this.setState(() => ({
                prevDisabled: true,
                nextDisabled: false
            }));
        } else if (nowDate.isSame(moment(this.state.maxDate), isSameEquality) && nextDisabledState) {
            this.setState(() => ({
                prevDisabled: false,
                nextDisabled: true
            }));
        } else if (!nowDate.isSame(moment(this.props.minDate), isSameEquality) &&
            !nowDate.isSame(moment(this.state.maxDate), isSameEquality) &&
            (this.state.prevDisabled || this.state.nextDisabled)) {
            this.setState(() => ({
                nextDisabled: false,
                prevDisabled: false
            }));
        }
    }

    async getSessionData() {
        const formatDate = this.line ? moment(this.state.date).format('YYYY-MM') :
            moment(this.state.date).format('YYYY');
        const fetchedDate = moment(this.state.date);
        const length = this.line ? 'month' : 'year';
        try {
            const sessionData = await getSessionsDurations(formatDate, length);
            // console.log(sessionData);
            this.setState(() => ({
                ...this.normalizeData(sessionData, fetchedDate),
                fetchedDate
            }));
        } catch (err) {
            this.setState(() => ({
                error: err.message
            }));
        }
    }

    normalizeData(data, date) {
        // console.log(data);
        let o = {sessions: [], durations: []};
        if (data.length === 0) {
            return this.fetchedDataEmpty(o);
        }
        if (this.line && data.length !== 0) {
            o.labels = [];
            const daysInMonth = date.daysInMonth();
            for (let i = 1; i <= daysInMonth; i++) {
                o.labels.push(i);
                const _item = data[0].data.find((item) => item.date === i);
                if (_item !== undefined) {
                    let {sessions, durations} = _item;
                    o.sessions.push(sessions);
                    o.durations.push(durations);
                } else {
                    o.sessions.push(0);
                    o.durations.push(0);
                }
            }
        } else if (!this.line) {
            for (let i = 1; i <= 12; i++) {
                const _item = data[0].data.find((item) => item.date === i);
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

    fetchedDataEmpty(o){
        if (this.line) {
            return {
                ...o,
                labels: (()=>{
                    let ar = [];
                    const daysInMonth = moment(this.state.date).daysInMonth();
                    for (let i = 1; i <= daysInMonth; i++) {
                        ar.push(i);
                    }
                    return ar;
                })()
            }
        } else {
            return {
                ...o,
                labels: this.state.labels
            }
        }
    }

    onDateChangeHandler(date) {
        this.setState(() => ({date}));
    }

    onDateChangeClickHandler(e) {
        const action = e.target.dataset.attr;
        const lengthDate = this.line ? 'month' : 'year';
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
                minDate={this.props.minDate}
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