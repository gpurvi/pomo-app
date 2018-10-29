import React from "react";

const XIcon = ({clearSelection}) => (
    <button
        className='dropdown__controller-button'
        onClick={clearSelection}
        aria-label="clear selection"
    >
        <svg
            viewBox="0 0 20 20"
            preserveAspectRatio="none"
            width={20}
            fill="transparent"
            stroke="#979797"
            strokeWidth="1.1px"
        >
            <path d="M1,1 L19,19"/>
            <path d="M19,1 L1,19"/>
        </svg>

    </button>
);

export default XIcon;