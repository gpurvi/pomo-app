import React from 'react';

const TotalTable = ({totalSessions, totalHours, averageSessions, averageHours}) => (
    <div className='container mt-6 pt-3'>
        <div className='row'>
            <div className='col-6 text-center'>
                {`Total sessions: ${totalSessions}`}
            </div>
            <div className='col-6 text-center'>
                {`Total hours: ${totalHours}`}
            </div>
        </div>

        <div className='row'>
            <div className='col-12'>
                <hr/>
            </div>

        </div>
        <div className='row'>
            <div className='col-6 text-center'>
                {`Average sessions per day: ${averageSessions}`}
            </div>
            <div className='col-6 text-center'>
                {`Average hours per day: ${averageHours}`}
            </div>
        </div>
    </div>
);

export default TotalTable;