import React from 'react';
import '../../styles/components/LoginPage/sign-page.css';
import {emailRegex} from "../../utils/emailRegex";
import {registerUser} from "../common/apiCalls";
import {Link} from 'react-router-dom';
import SignForm from "./SignForm";

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
            acceptTermsInvalid: false,

            isWaitingResponse: false,
            registerSuccess: false,
            showConfirmation: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    async onSubmit(e) {
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

        //todo implement cases for server validation
        if (validSubmit) {
            this.setState(() => ({
                isWaitingResponse: true
            }));
            try {
                const response = await registerUser({firstName, lastName, email, password: password1});
                // Successful registration, show feedback about email
                if (response.status === 200) {
                    this.setState(() => ({
                        isWaitingResponse: false,
                        showConfirmation: true
                    }));
                }
            } catch (err) {
                // console.log(err.response.status);
                if (err.response.status === 422) {
                    // Invalid data was supplied to the API, show validation errors
                    this.setState(() => ({
                        isWaitingResponse: false,
                        emailInvalid: true,
                        emailFeedBack: 'Email has already been taken'
                    }));
                }
            }

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
            <div>
                {
                    this.state.showConfirmation ? (
                        <div className='mt-5 pt-5 d-flex justify-content-center align-items-center container'>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Please check your email</h5>
                                    <p className='card-text'>
                                        We've sent a confirmation e-mail to <b>{this.state.email}</b>. Please click the
                                        confirmation
                                        link in
                                        the e-mail to confirm your e-mail address.
                                    </p>
                                    <p className='card-text'>Once you have confirmed your e-mail address,
                                        you will be able to login to <b>App name here</b>
                                    </p>
                                    <Link to="/" className="float-right btn btn-primary">Go to login page</Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <SignForm
                            {...this.state}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onSubmit={this.onSubmit}
                            onChange={this.onChange}
                        />
                    )
                }
            </div>
        );
    }

}

export default SignPage;