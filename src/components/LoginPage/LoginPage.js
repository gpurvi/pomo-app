import React from 'react';
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signInUser} from "../../actions/auth";
import '../../styles/components/LoginPage/login-page.css';
import {LoadingButton} from "../buttons/LoadingButton";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userInvalid: false,
            passInvalid: false,
            failedLogin: false,
            isWaitingResponse: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.valideFormFields = this.valideFormFields.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        if (!this.valideFormFields(email, password)) {
            try {
                this.setState(() => ({isWaitingResponse: true}));
                // setTimeout(async () => {
                await this.props.dispatch(signInUser({email, password}));
                // if (response.status === 201) {
                //     setTimeout(async () => {
                //         await this.props.dispatch(initTimer());
                //     }, 2000);
                // }
            } catch (err) {
                //todo implement more advanced cases when server fails??
                this.setState(() => ({
                    isWaitingResponse: false,
                    failedLogin: true
                }));
            }
        }
    }

    valideFormFields(email, password) {
        let invalid = false;
        if (email === '') {
            this.setState(() => ({userInvalid: true}));
            invalid = true;
        }
        if (password === '') {
            this.setState(() => ({passInvalid: true}));
            invalid = true;
        }
        return invalid;
    }

    onFocus(e) {
        const {name} = e.target;
        if (name === 'email') {
            this.setState(() => ({userInvalid: false}));
        }
        if (name === 'password') {
            this.setState(() => ({passInvalid: false}));
        }
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState(() => ({
            [name]: value
        }));
    }

    render() {
        const {email, password, userInvalid, passInvalid} = this.state;
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
                            value={email}
                            invalid={userInvalid}
                            id='loginEmail'
                            type="text"
                            className="form-control"
                            name="email"
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
                    (<div className='text-center alert-danger p-2'>
                        <b>Login failed. Check email or password.</b>
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
                    <LoadingButton
                        text='Login'
                        onClick={this.onSubmit}
                        isWaitingResponse={this.state.isWaitingResponse}
                    />
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