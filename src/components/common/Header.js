import React from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import NavTimerV1 from "./NavTimerV1";
import {logout} from "../../actions/auth";
import {stopTimer} from "../../actions/timer";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onLogoutModal = this.onLogoutModal.bind(this);
        this.state = {
            isOpen: false,
            modal: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeModal() {
        this.setState({
            modal: false
        });
    }

    onLogout(e) {
        e.preventDefault();
        if (this.props.timerStarted && !this.props.timerPaused) {
            this.setState({
                modal: true
            });
        } else {
            this.props.dispatch(stopTimer());
            this.props.dispatch(logout());
        }
    }

    onLogoutModal(e) {
        e.preventDefault();
        this.props.dispatch(stopTimer());
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
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.closeModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.closeModal}>Warning</ModalHeader>
                    <ModalBody>
                        If you will logout session timer will be terminated and session won't be saved.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onLogoutModal}>Logout</Button>{' '}
                        <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.timer
});

export default connect(mapStateToProps)(Header);
//todo implement logout button
