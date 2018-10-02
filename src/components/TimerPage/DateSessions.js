import React from 'react';
import subDays from 'date-fns/sub_days';
import SessionsTable from "./SessionsTable";
import DatePickerV1 from "../common/DatePickerV1";

//todo implement minDate
const DateSessions = ({onDateChange, date, sessions}) => (
    <div>
        <h1>Sessions</h1>
        <DatePickerV1
            minDate={subDays(new Date(), 5)}
            maxDate={new Date()}
            onDateChange={onDateChange}
            date={date}
            today={true}
            maxDetail='month'
        />
        {
            sessions.length ?
                <SessionsTable sessionData={sessions}/> :
                <h1>There is no data!</h1>
        }
    </div>
);

export default DateSessions;
