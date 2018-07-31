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

    const reduceSessionData = (sessions) => {
        return sessions.reduce(function (ar, item) {
            let {sessionName, duration} = item;
            const _item = ar.filter(function (a) {
                return a.sessionName === sessionName
            })[0];
            const indexOf = ar.indexOf(_item);

            if (indexOf > -1) {
                ar[indexOf] = {
                    sessionName,
                    count: _item.count + 1,
                    duration: _item.duration + duration
                };
            } else {
                ar.push({sessionName, count: 1, duration});
            }
            return ar;
        }, []);
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
            {reduceSessionData(props.sessionData).map((session, index) => {
                totalMillis += session.duration;
                sessionTotalCount += session.count;
                return (
                    <DataRow
                        key={index}
                        firstCol={session.sessionName}
                        secondCol={displayCountTime(session.count, session.duration)}
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