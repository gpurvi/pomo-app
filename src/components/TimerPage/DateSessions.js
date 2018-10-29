import React from 'react';
import SessionsTable from "./SessionsTable";
import DatePickerV1 from "../common/DatePickerV1";

const DateSessions = ({onDateChange, date, sessions}) => (
    <div>
        <div className='mt-4 mb-3 text-center'>
            <DatePickerV1
                maxDate={new Date()}
                onDateChange={onDateChange}
                date={date}
                today={true}
                maxDetail='month'
            />
        </div>
        <SessionsTable sessionData={sessions}/>
    </div>
);

export default DateSessions;
