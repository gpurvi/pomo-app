import React, {Component} from 'react';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

export default class LabelsManager extends Component {
    state = {
        date: moment()
    };
    render() {
        return (
            <div>
                <h1>Manage sessions</h1>

                <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({date})} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                    numberOfMonths={1}
                />
            </div>
        );
    };
}