import React from 'react';
import EditRow from './EditRow';
import normalizeDuration from './../../utils/normalizeDuration';

const EditTable = ({sessions, type, getSessions, onError}) => (
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
        {sessions.map(({sessionName, duration, id, createdAt = '12:10:55', count = 0}) =>
            <EditRow
                onError={onError}
                getSessions={getSessions}
                id={id}
                key={id}
                firstCol={sessionName}
                secCol={type === 'day' ? createdAt : count}
                thirdCol={normalizeDuration(duration)}/>
        )}
        </tbody>
    </table>
);

export default EditTable;