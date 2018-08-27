import React from "react";
import DatePicker from "react-date-picker";
import SimpleButton from "../buttons/SimpleButton";

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
        </div>
    )
};

export default ChartDatePicker;