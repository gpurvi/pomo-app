import React from "react";
import DatePicker from "react-date-picker";
import SimpleButton from "../buttons/SimpleButton";
import moment from "moment";
import isValid from 'date-fns/is_valid';
import isSameDate from './../../utils/isSameDate';


export default class DatePickerV1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nextDisabled: false,
            prevDisabled: false,
            todayDisabled: false
        };

        this.buttonDisabler = this.buttonDisabler.bind(this);
        this.getTimePeriod = this.getTimePeriod.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidUpdate() {
        // const prevDate = moment(prevProps.date);
        const nowDate = moment(this.props.date);

        //check for valid because may return null as date
        if (nowDate.isValid()) {
            this.buttonDisabler(nowDate);
        } else if (!nowDate.isValid()) {
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
        if (nowDate.isSame(moment(this.props.maxDate), isSameEquality) && !this.state.nextDisabled) {
            this.setState(() => ({
                nextDisabled: true
            }));
        } else if (!nowDate.isSame(moment(this.props.maxDate), isSameEquality) && this.state.nextDisabled) {
            this.setState(() => ({
                nextDisabled: false
            }));
        }
        // toggle disable state of prev button
        if (nowDate.isSame(moment(this.props.minDate), isSameEquality) && !this.state.prevDisabled) {
            this.setState(() => ({
                prevDisabled: true
            }));
        } else if (!nowDate.isSame(moment(this.props.minDate), isSameEquality) && this.state.prevDisabled) {
            this.setState(() => ({
                prevDisabled: false
            }));
        }
        // toggle disable state of today button
        if (nowDate.isSame(moment(), isSameEquality) && !this.state.todayDisabled) {
            this.setState(() => ({
                todayDisabled: true
            }));
        } else if (!nowDate.isSame(moment(), isSameEquality) && this.state.todayDisabled) {
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
            const action = data.target.dataset.attr;
            let timePeriod = this.getTimePeriod();
            if (action === 'prev') {
                this.props.onDateChange(moment(this.props.date)
                    .subtract(1, timePeriod).toDate());
            } else if (action === 'next') {
                this.props.onDateChange(moment(this.props.date)
                    .add(1, timePeriod).toDate());
            } else if (action === 'today') {
                this.props.onDateChange(moment().toDate());
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
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
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
