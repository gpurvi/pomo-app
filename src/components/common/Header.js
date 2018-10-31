import React from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import NavTimerV1 from "./NavTimerV1";
import {logout} from "../../actions/auth";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogout() {
        this.props.dispatch(logout());
    }

    render() {
        return (
            <Navbar className='fixed-top' color="light" light expand="md">
                <NavLink to="/timer" className="navbar-brand">
                    Pomo App
                </NavLink>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink className='nav-link' to="/timer">
                                Timer
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to="/chart">
                                Charts
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to="/edit">
                                Edit
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to="/settings">
                                Settings
                            </NavLink>
                        </NavItem>
                        <NavTimerV1
                            location={this.props.location}
                        />
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                onClick={this.onLogout}
                                className='nav-link'
                                to='/'
                            >
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>

        );
    }
}

export default connect()(Header);
//todo implement logout button
