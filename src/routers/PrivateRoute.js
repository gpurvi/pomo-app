import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/common/Header.js';

export const PrivateRoute = ({
                                 isAuthenticated,
                                 component: Component,
                                 ...rest
                             }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated ? (
            <div>
                <Header/>
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/"/>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: true
});

export default connect(mapStateToProps)(PrivateRoute);

