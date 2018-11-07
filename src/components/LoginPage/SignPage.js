import React from 'react';
import {
    withRouter
} from "react-router-dom";
import {Form, FormGroup, Row, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../../styles/components/LoginPage/sign-page.css';
import SimpleInput from "./SimpleInput";
import {emailRegex} from "../../utils/emailRegex";

class SignPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            firstNameInvalid: false,
            firstNameValid: false,
            lastName: '',
            lastNameInvalid: false,
            lastNameValid: false,

            email: '',
            emailInvalid: false,
            emailValid: false,
            emailFeedBack: '',

            password1: '',
            passInvalid1: false,
            passValid1: false,
            passFeedBack1: '',

            password2: '',
            passValid2: false,
            passInvalid2: false,
            passFeedBack2: '',

            acceptTerms: false,
            acceptTermsInvalid: false
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onSubmit(e) {
        const fieldReq = 'This field is required';
        let validSubmit = true;
        e.preventDefault();
        const {firstName, lastName, email, password1, password2, acceptTerms} = this.state;
        if (firstName === '') {
            validSubmit = false;
            this.setState(() => ({firstNameInvalid: true}));
        }
        if (lastName === '') {
            validSubmit = false;
            this.setState(() => ({lastNameInvalid: true}));
        }
        if (email === '') {
            validSubmit = false;
            this.setState(() => ({
                emailInvalid: true,
                emailFeedBack: fieldReq
            }));
        }
        if (password1 === '') {
            validSubmit = false;
            this.setState(() => ({
                passInvalid1: true,
                passFeedBack1: fieldReq
            }));
        }
        if (password2 === '') {
            validSubmit = false;
            this.setState(() => ({
                passInvalid2: true,
                passFeedBack2: fieldReq
            }));
        }
        if (acceptTerms === false) {
            validSubmit = false;
            // dont validate because not accept terms set
            this.setState(() => ({
                acceptTermsInvalid: true
            }));
        }

        //todo implement succseful registration
        if (validSubmit) {
            this.props.history.push('/');
        }
    }

    onBlur(e) {
        const {name, value} = e.target;
        if (name === 'firstName' && value !== '') {
            this.setState(() => ({firstNameValid: true}));
        }
        if (name === 'lastName' && value !== '') {
            this.setState(() => ({lastNameValid: true}));
            // return;
        }
        if (name === 'email') {
            //check if email is valid
            if (emailRegex.test(value)) {
                this.setState(() => ({emailValid: true}));
            } else {
                this.setState(() => ({
                    emailInvalid: true,
                    emailFeedBack: 'Your entered email is not valid'
                }));
            }
        }
        if (name === 'password1') {
            if (value.length >= 5) {
                this.setState(() => ({passValid1: true}));
            } else {
                this.setState(() => ({
                    passInvalid1: true,
                    passFeedBack1: 'Password must be at least 5 characters long'
                }));
            }
        }
        if (name === 'password2') {
            if (value === this.state.password1) {
                this.setState(() => ({passValid2: true}));
            } else {
                this.setState(() => ({
                    passInvalid2: true,
                    passFeedBack2: 'Passwords are not equal'
                }));
            }
        }

        // //todo implement login submit
        // this.props.dispatch(login());
    }

    onFocus(e) {
        const {name} = e.target;
        if (name === 'firstName') {
            this.setState(() => ({firstNameInvalid: false}));
        }
        if (name === 'lastName') {
            this.setState(() => ({lastNameInvalid: false}));
        }
        if (name === 'email') {
            this.setState(() => ({emailInvalid: false}));
        }
        if (name === 'password1') {
            this.setState(() => ({passInvalid1: false}));
        }
        if (name === 'password2') {
            this.setState(() => ({passInvalid2: false}));
        }
    }

    onChange(e) {
        const {name, value} = e.target;
        if (name === 'firstName') {
            this.setState(() => ({firstName: value}));
        }
        if (name === 'lastName') {
            this.setState(() => ({lastName: value}));
        }
        if (name === 'email') {
            this.setState(() => ({email: value}));
        }
        if (name === 'password1') {
            this.setState(() => ({password1: value}));
        }
        if (name === 'password2') {
            this.setState(() => ({password2: value}));
        }
        if (name === 'acceptTerms') {
            this.setState((prevState) => ({acceptTerms: !prevState.acceptTerms}),
                () => {
                    if (this.state.acceptTermsInvalid) {
                        this.setState(() => ({acceptTermsInvalid: false}));
                    }
                });
        }
    }

    render() {
        return (

            <div className="signup-form">
                <Form>
                    <h2>Register</h2>
                    <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                    <Row>
                        <div className="col-6">
                            <SimpleInput
                                invalid={this.state.firstNameInvalid}
                                value={this.state.firstName}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onChange={this.onChange}
                                feedBack='This field is required'
                                type="text"
                                className="form-control"
                                name='firstName'
                                placeholder='First Name'
                                required
                                valid={this.state.firstNameValid}
                            />
                        </div>
                        <div className="col-6">
                            <SimpleInput
                                invalid={this.state.lastNameInvalid}
                                value={this.state.lastName}
                                onBlur={this.onBlur}
                                onFocus={this.onFocus}
                                onChange={this.onChange}
                                feedBack='This field is required'
                                type="text"
                                className="form-control"
                                name='lastName'
                                placeholder='Last Name'
                                required
                                valid={this.state.lastNameValid}
                            />
                        </div>
                    </Row>

                    <SimpleInput
                        invalid={this.state.emailInvalid}
                        value={this.state.email}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                        valid={this.state.emailValid}
                        feedBack={this.state.emailFeedBack}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        required
                    />

                    <SimpleInput
                        invalid={this.state.passInvalid1}
                        value={this.state.password1}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                        valid={this.state.passValid1}
                        feedBack={this.state.passFeedBack1}
                        type="password"
                        name="password1"
                        placeholder="Password"
                        className="form-control"
                        required
                        formText='Password must be at least 5 characters long'
                    />
                    <SimpleInput
                        invalid={this.state.passInvalid2}
                        value={this.state.password2}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                        valid={this.state.passValid2}
                        feedBack={this.state.passFeedBack2}
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        className="form-control"
                        required
                    />
                    <FormGroup>

                        <div
                            className={`form-check form-check-inline ${this.state.acceptTermsInvalid ? 'border-bottom border-danger' : ''}`}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="acceptTerms"
                                value="acceptTerms"
                                name="acceptTerms"
                                checked={this.state.acceptTerms}
                                onChange={this.onChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="acceptTerms"
                            >
                                I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                            </label>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color='primary'
                            size='lg'
                            block
                            onClick={this.onSubmit}
                        >
                            Register Now
                        </Button>
                    </FormGroup>
                </Form>
                <div className="text-center">Already have an account?
                    <Link
                        to='/'
                    > Sign in
                    </Link>
                </div>
            </div>
        );
    }

}

export default withRouter(SignPage);