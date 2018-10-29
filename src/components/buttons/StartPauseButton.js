import React from 'react';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../../styles/components/TimerButton.css';

const StartPauseButton = ({startPauseClickHandler, timerStarted, breakTimerStarted}) => (

    <i
        onClick={startPauseClickHandler}
        className='d-inline-block mr-3 mr-lg-4'
    >
        {!timerStarted ? (
            breakTimerStarted ? (
                // grey play button
                <FontAwesomeIcon
                    size='5x'
                    className='timer-button--grey'
                    icon={faPlay}
                />
            ) : (
                //normal play button
                <FontAwesomeIcon size='5x' icon={faPlay}/>
            )
        ) : (
            // pause
            <FontAwesomeIcon size='5x' icon={faPause}/>
        )}
    </i>
);

export default StartPauseButton;