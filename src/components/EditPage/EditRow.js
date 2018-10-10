import React from 'react';
import Rename from './Rename';
import Delete from './Delete';

const EditRow = ({firstCol, secCol, thirdCol, id, deleteOnClick, onError, renameOnClick}) => (
    <tr>
        <td>{firstCol}</td>
        <td>{secCol}</td>
        <td>{thirdCol}</td>
        <td>
            <Rename
                renameOnClick={renameOnClick}
                onError={onError}
                id={id}
                modalName='Rename'
                initValue={firstCol}
            />
        </td>
        <td>
            <Delete
                deleteOnClick={deleteOnClick}
                onError={onError}
                id={id}
                modalName='Delete'
                initValue={firstCol}
            />
        </td>
    </tr>
);

export default EditRow;