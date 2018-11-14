import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export const LoadingButton = ({text, onClick, isWaitingResponse}) => (
    <button
        className='btn btn-primary btn-lg btn-block'
        onClick={onClick}
    >
        {isWaitingResponse ? (
            <FontAwesomeIcon size="1x" icon={faSpinner} spin/>
        ) : (
            <span>{text}</span>
        )}
    </button>
);