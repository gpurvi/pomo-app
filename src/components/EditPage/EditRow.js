import React from 'react';
import Rename from './Rename';
import Delete from './Delete';

const EditRow = ({firstCol, secCol, thirdCol, id, getSessions, onError}) => (
    <tr>
        <td>{firstCol}</td>
        <td>{secCol}</td>
        <td>{thirdCol}</td>
        <td>
            <Rename
                getSessions={getSessions}
                onError={onError}
                id={id}
                modalName='Rename'
                initValue={firstCol}
            />
        </td>
        <td>
            <Delete
                getSessions={getSessions}
                onError={onError}
                id={id}
                modalName='Delete'
                initValue={firstCol}
            />
        </td>
    </tr>
);

export default EditRow;