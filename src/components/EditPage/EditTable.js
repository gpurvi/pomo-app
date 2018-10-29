import React from 'react';
import EditRow from './EditRow';
import normalizeDuration from './../../utils/normalizeDuration';

const EditTable = ({sessions, type, deleteOnClick, onError, renameOnClick}) => {
    return (
        <div className='mt-6'>

            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>{type === 'day' ? 'End at' : 'Total count'}</th>
                    <th>{type === 'day' ? 'Duration' : 'Total duration'}</th>
                    <th colSpan={2} className='text-center'>Action</th>
                </tr>
                </thead>
                <tbody>

                {sessions.length !== 0 ? (
                    sessions.map(({sessionName, duration, id, createdAt = '12:10:55', count = 0}, index) =>
                        <EditRow
                            deleteOnClick={deleteOnClick}
                            renameOnClick={renameOnClick}
                            onError={onError}
                            id={id}
                            key={index}
                            firstCol={sessionName}
                            secCol={type === 'day' ? createdAt : count}
                            thirdCol={normalizeDuration(duration)}/>
                    )
                ) : (
                    <tr>
                        <td colSpan={5} className='no-sessions text-center'>
                            No sessions for this date
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};


export default EditTable;