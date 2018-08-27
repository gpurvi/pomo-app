import React from 'react';

const ChartHeader = ({header, date}) => (
    <h1>{`${header} in ${date}`}</h1>
);

export default ChartHeader;