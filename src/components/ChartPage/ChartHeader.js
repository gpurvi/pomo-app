import React from 'react';

const ChartHeader = ({header, date}) => (
    <React.Fragment>
        <h3 className='d-none d-sm-block'>{`${header} in ${date ? date : '...' }`}</h3>
        <h5 className='d-sm-none'>{`${header} in ${date ? date : '...' }`}</h5>
    </React.Fragment>
);

export default ChartHeader;