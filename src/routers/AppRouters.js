import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ChartPage from '../components/ChartPage/ChartPage';
import TimerPage from '../components/TimerPage/TimerPage';
import HeaderRoute from '../components/common/HeaderRoute';

const AppRoutes = () => (
    <BrowserRouter>
        <div>
            <Route component={HeaderRoute}/>
            <Route exact path='/' component={TimerPage}/>
            <Route path='/chart'  component={ChartPage}/>
        </div>
    </BrowserRouter>
);

export default AppRoutes;