import React from 'react';
import ChartDatePicker from "./ChartDatePicker";

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
        <ChartDatePicker
            nextDisabled={props.nextDisabled}
            prevDisabled={props.prevDisabled}
            minDate={props.minDate}
            maxDate={props.maxDate}
            maxDetail={props.maxDetail}
            onDateChange={props.onDateChange}
            date={props.date}
            onDateChangeClick={props.onDateChangeClick}
        />
    </div>
);

export default ChartButtons;