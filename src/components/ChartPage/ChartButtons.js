import React from 'react';
// import ChartDatePicker from "./ChartDatePicker";
import DatePickerV1 from "../common/DatePickerV1";

const ChartButtons = (props) => (
    <div>
        <label>
            <input
                type="checkbox"
                value="sessions"
                checked={props.showSessions}
                onChange={props.onCheck}
            />
            Sessions
        </label>
        <label>
            <input
                type="checkbox"
                value="hours"
                checked={props.showDurations}
                onChange={props.onCheck}
            />
            Hours
        </label>
        <DatePickerV1
            minDate={props.minDate}
            maxDate={props.maxDate}
            onDateChange={props.onDateChange}
            date={props.date}
            today={false}
            maxDetail={props.maxDetail}
        />
        {/*<ChartDatePicker*/}
        {/*nextDisabled={props.nextDisabled}*/}
        {/*prevDisabled={props.prevDisabled}*/}
        {/*minDate={props.minDate}*/}
        {/*maxDate={props.maxDate}*/}
        {/*maxDetail={props.maxDetail}*/}
        {/*onDateChange={props.onDateChange}*/}
        {/*date={props.date}*/}
        {/*onDateChangeClick={props.onDateChangeClick}*/}
        {/*/>*/}
    </div>
);

export default ChartButtons;