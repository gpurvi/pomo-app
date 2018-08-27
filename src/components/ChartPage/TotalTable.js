import React from 'react';

const TotalTable = ({totalSessions, totalHours, averageSessions, averageHours}) => (
    <div>
        <div>
            {`Total sessions: ${totalSessions} Total hours: ${totalHours}`}
        </div>
        <hr/>
        <div>
            {`Average sessions per day: ${averageSessions} Average hours per day: ${averageHours}`}
        </div>
    </div>
);

export default TotalTable;