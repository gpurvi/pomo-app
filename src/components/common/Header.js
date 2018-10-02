import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <NavLink to="/">
            timer page
        </NavLink>
        <NavLink to="/chart">
            chart page
        </NavLink>
        <NavLink to="/edit">
            Edit page
        </NavLink>
        <NavLink to="/settings">
            Settings page
        </NavLink>
    </header>
);

export default Header;
