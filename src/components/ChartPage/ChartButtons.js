import React from 'react';
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
    </div>
);

export default ChartButtons;