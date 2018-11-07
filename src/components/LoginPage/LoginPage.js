import React from 'react';
import {Form, FormGroup, Label, Button, Input, FormFeedback} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from "../../actions/auth";
import '../../styles/components/LoginPage/login-page.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userInvalid: false,
            passInvalid: false,
            failedLogin: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        if (username === '') {
            this.setState(() => ({userInvalid: true}));
        }
        if (password === '') {
            this.setState(() => ({passInvalid: true}));
            return;
        }
        //todo implement login submit and on fail feedback
        setTimeout(() => {
            this.props.dispatch(login());
            // this.setState(() => ({failedLogin: true}));
        }, 1000);


    }

    onFocus(e) {
        const {name} = e.target;
        if (name === 'username') {
            this.setState(() => ({userInvalid: false}));
        }
        if (name === 'password') {
            this.setState(() => ({passInvalid: false}));
        }
    }

    onChange(e) {
        const {name, value} = e.target;
        if (name === 'username') {
            this.setState(() => ({username: value}));
        }
        if (name === 'password') {
            this.setState(() => ({password: value}));
        }
    }

    render() {
        const {username, password, userInvalid, passInvalid} = this.state;
        return (
            <div className="wrapper">
                <Form className="form-signin">
                    <h2 className="text-center form-signin-heading">Please login</h2>
                    {/*<EmailInput/>*/}
                    <FormGroup>
                        <Label for='loginEmail'>
                            Email:
                        </Label>
                        <Input
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            value={username}
                            invalid={userInvalid}
                            id='loginEmail'
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Email Address"
                            required
                            autoFocus
                        />

                        <FormFeedback
                            className='position-absolute text-right'
                        >
                            Enter email
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='loginPassword'>
                            Password:
                        </Label>

                        <Input
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            value={password}
                            id='loginPassword'
                            invalid={passInvalid}
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required
                        />

                        <FormFeedback
                            className='position-absolute text-right'
                        >
                            Enter password
                        </FormFeedback>
                    </FormGroup>

                    {this.state.failedLogin &&
                    (<div className='alert-danger p-2'>
                        Login failed. Check email or password.
                    </div>)
                    }
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            value="remember-me"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                        > Remember me
                        </label>
                    </div>
                    <Button
                        onClick={this.onSubmit}
                        size='lg'
                        color='primary'
                        block
                    >
                        Login
                    </Button>
                    <div className='text-size--small mt-4 text-center'>
                        <div>
                            <span>Forgot </span> <Link to='/forgot'>password?</Link>
                        </div>
                        <div className='mt-1'>
                            <span>Create an account? </span> <Link to='/sign'>Sign up</Link>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     login: () => dispatch(login())
// });

export default connect()(LoginPage);
// export default LoginPage;