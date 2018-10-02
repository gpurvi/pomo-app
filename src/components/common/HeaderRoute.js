import React from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import TimerRoute from "../../routers/TimerRoute";

const HeaderRoute = ({match}) => {
    console.log(match.path);
    return (
        <div>
            <Route component={Header}/>
            <Route path='/chart' component={TimerRoute}/>
        </div>
    );
};

export default HeaderRoute;

