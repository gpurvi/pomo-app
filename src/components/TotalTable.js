import React from 'react';

const TotalTable = (props) => (
    <div>
        <div>
            Total sessions: {props.totalSessions}
            Total hours: {props.totalHours}
        </div>
        <hr/>
        <div>
            Average sessions per day: {props.aveSessions}
            Average hours per day: {props.aveHours}
        </div>
    </div>
);

export default TotalTable;