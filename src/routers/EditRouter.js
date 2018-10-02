import React from 'react';
import {Route, NavLink} from 'react-router-dom';

const EditRouter = ({match}) => (
    <div>
        <NavLink to={`${match.url}/day`}>
            Edit sessions per day
        </NavLink>
        <NavLink to={`${match.url}/name`}>
            Edit sessions
        </NavLink>
        <Route path={`${match.url}/day`}/>
    </div>
);

export default EditRouter;