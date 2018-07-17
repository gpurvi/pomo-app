import React from 'react';
import moment from 'moment';
import DataRow from "./DataRow";
import '../styles/components/SessionsTable.css';

const SessionsTable = (props) => {
    let totalMillis = 0, sessionTotalCount = 0;
    const displayTime = (millis) => {
        // if under 1 hour don't show 0 hour
        if (millis < 3600000) {
            return moment(millis).utc().format('m [min]');
        }
        // if exactly whole hours don't show 0 min
        if ((millis % 3600000) === 0) {
            return moment(millis).utc().format('k [h]');
        }
        // show hour and min
        return moment(millis).utc().format('k [h] m [min]');
    };

    const displayCountTime = (count, time) => {
        return `${count} / ${displayTime(time)}`;
    };

    return (
        <table className="SessionsTable">
            <thead>
            <tr>
                <th>Name</th>
                <th>Session/Time</th>
            </tr>
            </thead>
            <tbody>
            {props.sessionData.map((session) => {
                totalMillis += session.timeInMillis;
                sessionTotalCount += session.count;
                return (
                    <DataRow
                        key={session.sessionName}
                        firstCol={session.sessionName}
                        secondCol={displayCountTime(session.count, session.timeInMillis)}
                    />
                );
            })}
            </tbody>
            <tfoot>
            <tr>
                <td>Total</td>
                <td>{displayCountTime(sessionTotalCount, totalMillis)}</td>
            </tr>
            </tfoot>
        </table>
    )
};

export default SessionsTable;