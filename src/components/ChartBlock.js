import React from 'react';
import SimpleButton from "./SimpleButton";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DatePicker from "react-date-picker";
import moment from "moment";

export default class ChartBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            showSessions: true,
            showDurations: true,
            nextDisabled: false,
            prevDisabled: false,
            sessions: [],
            duration: [],
            labels: [],
            maxDate: new Date(2020, 11),
            minDate: new Date(2010, 5),
            sessionsDuration: [
                {date: 1, sessions: 15, duration: 8000000},
                {date: 4, sessions: 12, duration: 4000000},
                {date: 5, sessions: 5, duration: 15000000},
                {date: 6, sessions: 8, duration: 18000000},
                {date: 7, sessions: 13, duration: 4000000},
                {date: 10, sessions: 15, duration: 15000000},
                {date: 11, sessions: 8, duration: 18000000}
            ]
        };

        this.onChange = this.onChange.bind(this);
        this.onCheckHandler = this.onCheckHandler.bind(this);
        this.setChartData = this.setChartData.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.toggleShowHandler = this.toggleShowHandler.bind(this);
    }

    componentDidMount() {
        this.setChartData();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("update", this.state.date);
        let formatDate, minDate, maxDate;
        if (this.props.type === 'line') {
            formatDate = moment(this.state.date).format('M YYYY');
            minDate = moment(this.state.minDate).format('M YYYY');
            maxDate = moment(this.state.maxDate).format('M YYYY');

            if (moment(prevState.date).format('M YYYY') !== formatDate) {
                this.setChartData();
            }

        } else if (this.props.type === 'bar') {
            formatDate = moment(this.state.date).format('YYYY');
            minDate = moment(this.state.minDate).format('YYYY');
            maxDate = moment(this.state.maxDate).format('YYYY');

            if (moment(prevState.date).format('YYYY') !== formatDate) {
                this.setChartData();
            }
        }

        // to toggle disabled state of next button
        if ((formatDate === maxDate) && !this.state.nextDisabled) {
            this.setState(() => ({nextDisabled: true}));
        } else if ((formatDate !== maxDate) && this.state.nextDisabled) {
            this.setState(() => ({nextDisabled: false}));
        }

        // to toggle disabled state of prev button
        if ((formatDate === minDate) &&
            !this.state.prevDisabled) {
            this.setState(() => ({prevDisabled: true}));
        } else if ((formatDate !== minDate) && this.state.prevDisabled) {
            this.setState(() => ({prevDisabled: false}));
        }
    }

    setChartData() {
        if (this.props.type === 'line') {
            const dayCount = moment(this.state.date).daysInMonth();
            // console.log("in setChart", moment(this.state.date).daysInMonth());
            const labels = [], sessionsAr = [], durationAr = [];
            for (let i = 1; i <= dayCount; i++) {
                labels.push(i);
                const _item = this.state.sessionsDuration.find((item) => item.date === i);
                if (_item !== undefined) {
                    let {sessions, duration} = _item;
                    duration = (duration / 3600000).toPrecision(2);
                    sessionsAr.push(sessions);
                    durationAr.push(duration);
                } else {
                    sessionsAr.push(0);
                    durationAr.push(0);
                }
            }
            // console.log('labels length', labels.length);
            this.setState(() => ({
                labels,
                sessions: sessionsAr,
                duration: durationAr
            }));
        } else if (this.props.type === 'bar') {
            const yearLength = 12;
            const sessionsAr = [], durationAr = [];
            for (let i = 1; i <= yearLength; i++) {
                const _item = this.state.sessionsDuration.find((item) => item.date === i);
                if (_item !== undefined) {
                    let {sessions, duration} = _item;
                    duration = (duration / 3600000).toPrecision(2);
                    sessionsAr.push(sessions);
                    durationAr.push(duration);
                } else {
                    sessionsAr.push(0);
                    durationAr.push(0);
                }
            }
            this.setState(() => ({
                sessions: sessionsAr,
                duration: durationAr
            }));
        }
    }

    onChange(date) {
        this.setState(() => ({date}));
    }

    onCheckHandler(e) {
        const value = e.target.value;
        if (value === 'sessions') {
            this.setState((prevState) => ({showSessions: !prevState.showSessions}));
        } else if (value === 'hours') {
            this.setState((prevState) => ({showDurations: !prevState.showDurations}));
        }
    }

    onClickHandler(e) {
        const attr = e.target.dataset.attr;
        if (attr === 'next') {
            this.setState(() => ({prevDisabled: false}));
            const current = moment(this.state.date);
            if (this.props.type === 'line') {
                this.setState(() => ({date: current.add(1, 'M').toDate()}));
            } else if (this.props.type === 'bar') {
                this.setState(() => ({date: current.add(1, 'y').toDate()}));
            }

        } else if (attr === 'prev') {
            this.setState(() => ({nextDisabled: false}));
            const current = moment(this.state.date);
            if (this.props.type === 'line') {
                this.setState(() => ({date: current.subtract(1, 'M').toDate()}));
            } else if (this.props.type === 'bar') {
                this.setState(() => ({date: current.subtract(1, 'years').toDate()}));
            }
        }
    }

    toggleShowHandler(type, show) {
        if (type === 'sessions') {
            this.setState(() => ({showSessions: show}))
        }
        if (type === 'duration') {
            this.setState(() => ({showDurations: show}))
        }
    }

    render() {
        return (
            <div className="chart-block">
                <div className="chart">
                    {this.props.type === 'bar' ?
                        <BarChart
                            title={this.props.title}
                            sessions={this.state.sessions}
                            duration={this.state.duration}
                            average={this.props.average}
                            showSessions={this.state.showSessions}
                            showDurations={this.state.showDurations}/>
                        :
                        <LineChart
                            toggleShow={this.toggleShowHandler}
                            title={this.props.title}
                            sessions={this.state.sessions}
                            duration={this.state.duration}
                            showSessions={this.state.showSessions}
                            showDurations={this.state.showDurations}
                            date={this.state.date}
                            labels={this.state.labels}/>
                    }
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="sessions"
                            checked={this.state.showSessions}
                            onChange={this.onCheckHandler}
                        />
                        Sessions
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="hours"
                            checked={this.state.showDurations}
                            onChange={this.onCheckHandler}
                        />
                        Hours
                    </label>
                    <DatePicker
                        maxDate={this.state.maxDate}
                        minDate={this.state.minDate}
                        maxDetail={this.props.maxDetail}
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                    <SimpleButton
                        disabled={this.state.prevDisabled}
                        dataAttr="prev"
                        onClick={this.onClickHandler}
                        text='prev'
                    />
                    <SimpleButton
                        disabled={this.state.nextDisabled}
                        dataAttr="next"
                        onClick={this.onClickHandler}
                        text='next'
                    />
                </div>
            </div>
        );
    }
}