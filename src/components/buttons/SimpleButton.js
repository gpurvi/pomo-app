import React from 'react';

const SimpleButton = (props) => (
    <button
        className='btn btn-secondary btn-sm'
        type='button'
        disabled={props.disabled}
        data-attr={props.dataAttr}
        onClick={props.onClick}
    >
        {props.text}
    </button>
);

export default SimpleButton;