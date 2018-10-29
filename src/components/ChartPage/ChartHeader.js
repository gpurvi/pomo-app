import React from 'react';

const ChartHeader = ({header, date}) => (
    <h3>{`${header} in ${date ? date : '...' }`}</h3>
);

export default ChartHeader;