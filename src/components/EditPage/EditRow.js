import React from 'react';
import Rename from './Rename';
import Delete from './Delete';

const EditRow = ({firstCol, secCol, thirdCol, id, deleteOnClick, onError, renameOnClick}) => (
    <tr className='table--vertical-align-middle'>
        <td>{firstCol}</td>
        <td>{secCol}</td>
        <td>{thirdCol}</td>
        <td colSpan={2} className='text-center'>
            <div className='d-inline-block mr-0  mr-sm-3'>
                <Rename
                    renameOnClick={renameOnClick}
                    onError={onError}
                    id={id}
                    modalName='Rename'
                    initValue={firstCol}
                />
            </div>
            <div className='d-inline-block mt-1 mt-sm-0 mt-sm-0 ml-0 ml-sm-3'>
                <Delete
                    deleteOnClick={deleteOnClick}
                    onError={onError}
                    id={id}
                    modalName='Delete'
                    initValue={firstCol}
                />
            </div>
        </td>
    </tr>
);

export default EditRow;