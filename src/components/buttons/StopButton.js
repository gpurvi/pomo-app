import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStop} from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/TimerButton.css';

const StopButton = (props) => (
    <i
        onClick={props.onStopHandler}
        className='d-inline-block ml-3 ml-lg-4'
    >
        {props.timerRunning ? (
            // started
            <FontAwesomeIcon size='5x' icon={faStop}/>
        ) : (
            // stopped
            <FontAwesomeIcon
                icon={faStop}
                size='5x'
                className='timer-button--grey'
            />
        )}
    </i>
);

export default StopButton;