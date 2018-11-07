import React from 'react';
import LoadingCircle from "../common/LoadingCircle";

const TotalTable = ({loading, totalSessions, totalHours, averageSessions, averageHours}) => (
    <div className='container mt-6 pt-3'>
        <div className='position-relative'>
            <LoadingCircle height='h-100' loading={loading}/>
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
                    <hr className='mt-1 mb-1'/>
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
    </div>
);

export default TotalTable;