import React from 'react';
import ChartInter from "./ChartInter";
import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/get_days_in_month';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import isDate from 'date-fns/is_date';
import {getSessions} from "../common/apiCalls";
import isSameDate from "../../utils/isSameDate";

export default class ChartBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            sessions: [],
            durations: [],
            date: new Date(),
            fetchedDate: null, //state which changes when data is fetched, need for chart to show right data
            error: ''
        };

        this.line = this.props.type === 'line';

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.getSessionData = this.getSessionData.bind(this);
        this.fetchedDataEmpty = this.fetchedDataEmpty.bind(this);
        this.prepareDataForChart = this.prepareDataForChart.bind(this);
    }


    async componentDidMount() {
        // this.fetchData();
        await this.getSessionData();
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevDate = prevState.date;
        const nowDate = this.state.date;
        // after date is updated fetch new data
        // isValid because it is possible to get invalid date from DatePicker
        if (isDate(nowDate)) {
            if (!isSameDate(prevDate, nowDate)) {
                // setTimeout(async ()=>{
                    await this.getSessionData();
                // }, 1000);

            }
        }
    }

    async getSessionData() {
        const formatDate = this.line ? format(this.state.date, 'YYYY-MM') :
            format(this.state.date, 'YYYY');
        const fetchedDate = this.state.date;
        const timePeriod = this.line ? 'month' : 'year';
        try {
            const sessionData = await getSessions(formatDate, timePeriod);
            this.setState(() => ({
                ...this.prepareDataForChart(sessionData, fetchedDate),
                fetchedDate
            }));
        } catch (err) {
            this.setState(() => ({
                error: err.message
            }));
        }
    }

    prepareDataForChart(data, date) {
        let o = {sessions: [], durations: []};
        if (data.length === 0) {
            return this.fetchedDataEmpty(o);
        }
        if (this.line && data.length !== 0) {
            o.labels = [];
            const daysInMonth = getDaysInMonth(date);
            for (let i = 1; i <= daysInMonth; i++) {
                o.labels.push(i);
                const _item = data.find((item) => getDate(item.date) === i);
                if (_item !== undefined) {
                    let {count, duration} = _item;
                    o.sessions.push(count);
                    o.durations.push(this.prepareDuration(duration, 'line'));
                } else {
                    o.sessions.push(0);
                    o.durations.push(0);
                }
            }
        } else if (!this.line) {
            for (let i = 1; i <= 12; i++) {
                const _item = data.find((item) => getMonth(item.date) === i);
                if (_item !== undefined) {
                    let {count, duration} = _item;
                    o.sessions.push(count);
                    o.durations.push(this.prepareDuration(duration, 'bar'));
                } else {
                    o.sessions.push(0);
                    o.durations.push(0);
                }
            }
        }
        return o;
    }

    prepareDuration(duration, chartType) {
        if (chartType === 'line') {
            return (duration / (1000 * 60 * 60)).toPrecision(2);
        }
        return (duration / (1000 * 60 * 60)).toPrecision(3);
    }

    fetchedDataEmpty(o) {
        if (this.line) {
            return {
                ...o,
                labels: (() => {
                    let ar = [];

                    const daysInMonth = getDaysInMonth(this.state.date);
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
                labels={this.state.labels}
                onDateChange={this.onDateChangeHandler}
            />
        );
    }
}