import React from 'react';

const DataRow = (props) => (
    <tr>
        <td className='owerflow-warp--break-word'>{props.firstCol}</td>
        <td>{props.secondCol}</td>
    </tr>
);

export default DataRow;