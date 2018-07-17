import React from 'react';

const DataRow = (props) => (
    <tr>
        <td>{props.firstCol}</td>
        <td>{props.secondCol}</td>
    </tr>
);

export default DataRow;