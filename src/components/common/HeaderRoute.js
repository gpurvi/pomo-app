import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import Header from './Header';
import Timer from "../TimerPage/Timer";

const HeaderRoute = ({location}) => {
    console.log(location);
    const {timerStarted} = JSON.parse(localStorage.getItem('sessionState'));
    return (
        <div>
            <Route component={Header}/>
            {timerStarted &&
            <Route
                path='/chart'
                /*component={Timer}*/
                render={() => <p>bbasb</p>}/>
            }
        </div>
    );
};

export default HeaderRoute;

