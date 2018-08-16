import React from 'react';

const SimpleButton = (props) => (
    <button
        disabled={props.disabled}
        data-attr={props.dataAttr}
        onClick={props.onClick}
    >
        {props.text}
    </button>
);

export default SimpleButton;