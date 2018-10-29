import React from 'react';

const ArrowIcon = ({isOpen, ...rest}) => (<button {...rest}>
    <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={20}
        fill="transparent"
        stroke="#979797"
        strokeWidth="1.1px"
        transform={isOpen ? 'rotate(180)' : null}
    >
        <path d="M1,6 L10,15 L19,6"/>
    </svg>
</button>);

export default ArrowIcon;