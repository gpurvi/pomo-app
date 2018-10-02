import React from 'react';

const StartPauseGreyButton = ({breakTimerStarted, startPauseClickHandler}) => (
    <i onClick={startPauseClickHandler}>
        {breakTimerStarted ? (
            // grey play button
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" fill="grey"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        ) : (
            // normal play button
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )}
    </i>
);

export default StartPauseGreyButton;