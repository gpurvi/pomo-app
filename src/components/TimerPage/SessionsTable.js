import React from 'react';
import DataRow from "./DataRow";
import normalizeDuration from './../../utils/normalizeDuration';
import {reduceSessions} from "../../utils/reduceSessions";
import '../../styles/components/table.css';
import LoadingCircle from "../common/LoadingCircle";


const SessionsTable = (props) => {
    let totalMillis = 0, sessionTotalCount = 0;
    const displayCountTime = (count, time) => {
        return `${count} / ${normalizeDuration(time)}`;
    };
    const isSessionData = props.sessionData.length > 0;
    const tableStyles = isSessionData ? 'table-striped' : undefined;
    return (
        <div className='position-relative'>
            <LoadingCircle marginTop='mt-5' height='h-75' loading={props.loading}/>
            <table className={`table text-center ${tableStyles} mt-4`}>
                <thead>
                <tr>
                    <th scope="col">Session</th>
                    <th scope="col">Count / Duration</th>
                </tr>
                </thead>
                <tbody>
                {isSessionData ? (
                    reduceSessions(props.sessionData).map((session, index) => {
                        totalMillis += session.duration;
                        sessionTotalCount += session.count;
                        return (
                            <DataRow
                                key={index}
                                firstCol={session.sessionName}
                                secondCol={displayCountTime(session.count, session.duration)}
                            />
                        );
                    })

                ) : (
                    <tr>
                        <td className='no-sessions' colSpan={2}>No sessions for this date</td>
                    </tr>
                )}
                </tbody>
                {
                    isSessionData && (
                        <tfoot className='table-tfoot'>
                        <tr>
                            <td>Total</td>
                            <td>{displayCountTime(sessionTotalCount, totalMillis)}</td>
                        </tr>
                        </tfoot>
                    )
                }
            </table>

        </div>


    )
};

export default SessionsTable;

