import React from 'react';
import DataRow from "./DataRow";
import normalizeDuration from './../../utils/normalizeDuration';
import {reduceSessions} from "../../utils/reduceSessions";

const SessionsTable = (props) => {
    let totalMillis = 0, sessionTotalCount = 0;
    const displayCountTime = (count, time) => {
        return `${count} / ${normalizeDuration(time)}`;
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
            {reduceSessions(props.sessionData).map((session, index) => {
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