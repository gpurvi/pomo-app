import React from "react";
import DatePicker from "react-date-picker";
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import subDays from 'date-fns/sub_days';
import addDays from 'date-fns/add_days';
import subYears from 'date-fns/sub_years';
import subMonths from 'date-fns/sub_months';
import isSameDate from './../../utils/isSameDate';
import isDate from 'date-fns/is_date';
import SimpleButton from "../buttons/SimpleButton";
import {getMinDate} from "./apiCalls";

export default class DatePickerV1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nextDisabled: false,
            prevDisabled: false,
            todayDisabled: false,
            minDate: null
        };

        this.maxDate = new Date();

        this.buttonDisabler = this.buttonDisabler.bind(this);
        this.getTimePeriod = this.getTimePeriod.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    async componentDidMount() {
        const appState = JSON.parse(localStorage.getItem('appState'));
        if (appState === null) {
            const minDate = await getMinDate();
            this.setState(() => ({minDate: new Date(minDate)}));
            localStorage.setItem('appState', JSON.stringify({minDate}));
        } else {
            const {minDate} = JSON.parse(localStorage.getItem('appState'));
            this.setState(() => ({minDate: new Date(minDate)}));
        }

    }

    componentDidUpdate() {
        // const prevDate = moment(prevProps.date);
        const nowDate = this.props.date;

        //check for valid because may return null as date
        if (isDate(nowDate)) {
            this.buttonDisabler(nowDate);
        } else if (!isDate(nowDate)) {
            if (!this.state.nextDisabled || !this.state.prevDisabled) {
                this.setState(() => ({
                    prevDisabled: true,
                    nextDisabled: true,
                    todayDisabled: false
                }));
            }
        }
    }

    buttonDisabler(nowDate) {
        const isSameEquality = this.getTimePeriod();
        // toggle disable state of next button
        if (isSameDate(this.maxDate, nowDate, isSameEquality) && !this.state.nextDisabled) {
            this.setState(() => ({
                nextDisabled: true
            }));
        } else if (!isSameDate(this.maxDate, nowDate, isSameEquality) && this.state.nextDisabled) {
            this.setState(() => ({
                nextDisabled: false
            }));
        }
        // toggle disable state of prev button
        if (isSameDate(this.state.minDate, nowDate, isSameEquality) && !this.state.prevDisabled) {
            this.setState(() => ({
                prevDisabled: true
            }));
        } else if (!isSameDate(this.state.minDate, nowDate, isSameEquality) && this.state.prevDisabled) {
            this.setState(() => ({
                prevDisabled: false
            }));
        }
        // toggle disable state of today button
        if (isSameDate(new Date(), nowDate, isSameEquality) && !this.state.todayDisabled) {
            this.setState(() => ({
                todayDisabled: true
            }));
        } else if (!isSameDate(new Date(), nowDate, isSameEquality) && this.state.todayDisabled) {
            this.setState(() => ({
                todayDisabled: false
            }));
        }

    }

    onDateChange(data) {
        // check for null because because datepicker can return null (also valid)
        if ((data instanceof Date) || data === null) {
            this.props.onDateChange(data);
        } else {
            //called block when date changed via buttons
            const action = data.target.dataset.attr;
            let timePeriod = this.getTimePeriod();
            if (action === 'prev') {
                if (timePeriod === 'day') {
                    this.props.onDateChange(subDays(this.props.date, 1));
                } else if (timePeriod === 'month') {
                    this.props.onDateChange(subMonths(this.props.date, 1));
                } else if (timePeriod === 'year') {
                    this.props.onDateChange(subYears(this.props.date, 1));
                }
            } else if (action === 'next') {
                if (timePeriod === 'day') {
                    this.props.onDateChange(addDays(this.props.date, 1));
                } else if (timePeriod === 'month') {
                    this.props.onDateChange(addMonths(this.props.date, 1));
                } else if (timePeriod === 'year') {
                    this.props.onDateChange(addYears(this.props.date, 1));
                }
            } else if (action === 'today') {
                this.props.onDateChange(new Date());
            }
        }
    }

    getTimePeriod() {
        const maxDetail = this.props.maxDetail;
        if (maxDetail === 'month') {
            return 'day';
        } else if (maxDetail === 'year') {
            return 'month';
        } else if (maxDetail === 'decade') {
            return 'year';
        }
    }

    render() {
        return (
            <div>

                <DatePicker
                    minDate={this.state.minDate}
                    maxDate={this.maxDate}
                    maxDetail={this.props.maxDetail}
                    onChange={this.onDateChange}
                    value={this.props.date}
                />
                <SimpleButton
                    disabled={this.state.prevDisabled}
                    dataAttr="prev"
                    onClick={this.onDateChange}
                    text='prev'
                />
                <SimpleButton
                    disabled={this.state.nextDisabled}
                    dataAttr="next"
                    onClick={this.onDateChange}
                    text='next'
                />
                {this.props.today &&
                <SimpleButton
                    disabled={this.state.todayDisabled}
                    onClick={this.onDateChange}
                    text='today'
                    dataAttr="today"/>
                }
            </div>
        )
    }
}


