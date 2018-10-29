import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import ChartPage from '../components/ChartPage/ChartPage';
import TimerPage from '../components/TimerPage/TimerPage';
import EditPage from '../components/EditPage/EditPage';
import SettingsPage from '../components/SettingsPage/SettingsPage';
import {LoginPage} from "../components/common/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../components/common/NotFoundPage";
// import Header from '../components/common/Header';
// import TimerRoute from "./TimerRoute";
// import HeaderRoute from '../components/common/HeaderRoute';
// import EditRouter from './EditRouter'

const AppRoutes = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <PublicRoute exact path='/' component={LoginPage}/>
                {/*<Route exact path='/' component={LoginPage}/>*/}
                {/*<Route component={Header}/>*/}
                {/*<Route component={TimerRoute}/>*/}
                <PrivateRoute path='/timer' component={TimerPage}/>
                <PrivateRoute path='/chart' component={ChartPage}/>
                <PrivateRoute path='/edit' component={EditPage}/>
                <PrivateRoute path='/settings' component={SettingsPage}/>
                <NotFoundPage/>
                {/*<Route path='/timer' component={TimerPage}/>*/}
                {/*<Route path='/chart'  component={ChartPage}/>*/}
                {/*<Route path='/edit'  component={EditPage}/>*/}
                {/*<Route path='/settings'  component={SettingsPage}/>*/}
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRoutes;