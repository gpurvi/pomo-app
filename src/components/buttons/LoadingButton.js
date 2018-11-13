import React from 'react';

const LoadingButton = (props) => (
    <button {...props}>
        <div className="lds-ring--small">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </button>
);