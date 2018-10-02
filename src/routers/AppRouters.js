import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ChartPage from '../components/ChartPage/ChartPage';
import TimerPage from '../components/TimerPage/TimerPage';
import EditPage from '../components/EditPage/EditPage';
// import HeaderRoute from '../components/common/HeaderRoute';
import Header from '../components/common/Header';
import SettingsPage from '../components/SettingsPage/SettingsPage';
import TimerRoute from "./TimerRoute";
// import EditRouter from './EditRouter'

const AppRoutes = () => (
    <BrowserRouter>
        <div>
            <Route component={Header}/>
            <Route component={TimerRoute}/>
            <Route exact path='/' component={TimerPage}/>
            <Route path='/chart'  component={ChartPage}/>
            <Route path='/edit'  component={EditPage}/>
            <Route path='/settings'  component={SettingsPage}/>
        </div>
    </BrowserRouter>
);

export default AppRoutes;