import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar className='fixed-top' color="light" light expand="md">
                <NavLink to="/" className="navbar-brand">
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
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='nav-link' to="/logout">
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

        );
    }
}
//todo implement logout button
