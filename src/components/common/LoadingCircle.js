import React from 'react';

const LoadingCircle = ({loading, marginTop='', height=''}) => (
    <div
        className={`${height} ${marginTop} ${loading ? 'd-flex' : 'd-none'} align-items-center justify-content-center w-100 position-absolute background-loader`}>
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default LoadingCircle;
