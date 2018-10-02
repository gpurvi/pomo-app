import React from 'react';
import DataRow from "./DataRow";
import normalizeDuration from './../../utils/normalizeDuration';

const SessionsTable = (props) => {
    let totalMillis = 0, sessionTotalCount = 0;
    const displayCountTime = (count, time) => {
        return `${count} / ${normalizeDuration(time)}`;
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
        <table>
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