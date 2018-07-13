import React from 'react';

const StopButton = (props) => (
        <i onClick={props.onStopHandler}>
            {props.timerStarted ? (
                // started
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 6h12v12H6z"/>
                </svg>
            ) : (
                // stopped
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 6h12v12H6z" fill="grey"/>
                </svg>
            )}
        </i>
);

export default StopButton;