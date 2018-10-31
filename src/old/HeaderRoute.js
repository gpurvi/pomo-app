import React from 'react';
import {Route} from 'react-router-dom';
import Header from '../components/common/Header';
import TimerRoute from "./NavTimer";

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

