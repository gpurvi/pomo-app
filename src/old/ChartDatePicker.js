import React from "react";
import DatePicker from "react-date-picker";
import SimpleButton from "../components/buttons/SimpleButton";

const ChartDatePicker = (props) => {
    return (
        <div>
            <DatePicker
                minDate={props.minDate}
                maxDate={props.maxDate}
                maxDetail={props.maxDetail}
                onChange={props.onDateChange}
                value={props.date}
            />
            <SimpleButton
                disabled={props.prevDisabled}
                dataAttr="prev"
                onClick={props.onDateChangeClick}
                text='prev'
            />
            <SimpleButton
                disabled={props.nextDisabled}
                dataAttr="next"
                onClick={props.onDateChangeClick}
                text='next'
            />
            {props.today &&
            <SimpleButton
                disabled={props.todayDisabled}
                onClick={this.onDateChangeClick}
                text='today'
                dataAttr="now"/>
            }
        </div>
    )
};

export default ChartDatePicker;