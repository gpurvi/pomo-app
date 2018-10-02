import React from 'react';
import ChartInter from "./ChartInter";
import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/get_days_in_month';
import moment from "moment";
import {getSessionsDurations} from "../common/apiCalls";

export default class ChartBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            sessions: [],
            durations: [],
            maxDate: new Date(),
            date: new Date(),
            fetchedDate: null, //state which changes when data is fetched, need for chart to show right data
            error: ''
        };

        this.line = this.props.type === 'line';

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
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
            // this.buttonDisabler(nowDate, prevDate);
        }
        /*else if (!nowDate.isValid()) {
                   if (!this.state.nextDisabled || !this.state.prevDisabled) {
                       this.setState(() => ({
                           prevDisabled: true,
                           nextDisabled: true
                       }));
                   }
               }*/
    }


    async getSessionData() {
        const formatDate = this.line ? format(this.state.date, 'YYYY-MM') :
            format(this.state.date, 'YYYY');
        const fetchedDate = this.state.date;
        const timePeriod = this.line ? 'month' : 'year';
        try {
            //this fetch is for dev server
            const sessionData = await getSessionsDurations(formatDate, timePeriod);
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
            const daysInMonth = getDaysInMonth(date);
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

    fetchedDataEmpty(o) {
        if (this.line) {
            return {
                ...o,
                labels: (() => {
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
                onDateChange={this.onDateChangeHandler}
            />
        );
    }
}