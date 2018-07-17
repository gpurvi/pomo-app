import React from 'react';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import SimpleButton from './SimpleButton';


export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: null
        };

        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onDateChangeHandler(date) {
        this.props.onDateChange(date);
    }

    onClickHandler(e) {
        const action = e.target.dataset.attr;
        this.props.onClick(action);
    }

    render() {
        return (
            <div>
                <SingleDatePicker
                    date={this.props.date}
                    onDateChange={this.onDateChangeHandler}
                    focused={this.state.focused}
                    onFocusChange={({focused}) => this.setState({focused})}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDate={true}
                />
                <SimpleButton onClick={this.onClickHandler} text='<' dataAttr="prev"/>
                <SimpleButton onClick={this.onClickHandler} text='>' dataAttr="next"/>
                <SimpleButton onClick={this.onClickHandler} text='today' dataAttr="now"/>
            </div>
        );
    }
}

//this.onDateChangeHandler