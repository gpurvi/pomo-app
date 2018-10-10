import React from 'react';
import EditRow from './EditRow';
import normalizeDuration from './../../utils/normalizeDuration';

const EditTable = ({sessions, type, deleteOnClick, onError, renameOnClick}) => {
    return (
        <div>
            {sessions.length !== 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>{type === 'day' ? 'End at' : 'Total count'}</th>
                        <th>{type === 'day' ? 'Duration' : 'Total duration'}</th>
                        <th colSpan={2}>Modify</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sessions.map(({sessionName, duration, id, createdAt = '12:10:55', count = 0}, index) =>
                        <EditRow
                            deleteOnClick={deleteOnClick}
                            renameOnClick={renameOnClick}
                            onError={onError}
                            id={id}
                            key={index}
                            firstCol={sessionName}
                            secCol={type === 'day' ? createdAt : count}
                            thirdCol={normalizeDuration(duration)}/>
                    )}
                    </tbody>
                </table>
            ) : (
                <h1>No data for this date</h1>
            )}
        </div>
    );
};


export default EditTable;