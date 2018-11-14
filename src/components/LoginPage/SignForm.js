import React from 'react';
import {Form, FormGroup, Row} from 'reactstrap';
import SimpleInput from "./SimpleInput";
import {Link} from 'react-router-dom';
import {LoadingButton} from "../buttons/LoadingButton";

const SignForm = (props) => (
    <div className="signup-form">
        <Form>
            <h2>Register</h2>
            <p className="hint-text">Create your account. It's free and only takes a minute.</p>
            <Row>
                <div className="col-6">
                    <SimpleInput
                        invalid={props.firstNameInvalid}
                        value={props.firstName}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        feedBack='This field is required'
                        type="text"
                        className="form-control"
                        name='firstName'
                        placeholder='First Name'
                        required
                        valid={props.firstNameValid}
                    />
                </div>
                <div className="col-6">
                    <SimpleInput
                        invalid={props.lastNameInvalid}
                        value={props.lastName}
                        onBlur={props.onBlur}
                        onFocus={props.onFocus}
                        onChange={props.onChange}
                        feedBack='This field is required'
                        type="text"
                        className="form-control"
                        name='lastName'
                        placeholder='Last Name'
                        required
                        valid={props.lastNameValid}
                    />
                </div>
            </Row>

            <SimpleInput
                invalid={props.emailInvalid}
                value={props.email}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onChange={props.onChange}
                valid={props.emailValid}
                feedBack={props.emailFeedBack}
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                required
            />

            <SimpleInput
                invalid={props.passInvalid1}
                value={props.password1}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onChange={props.onChange}
                valid={props.passValid1}
                feedBack={props.passFeedBack1}
                type="password"
                name="password1"
                placeholder="Password"
                className="form-control"
                required
                formText='Password must be at least 5 characters long'
            />
            <SimpleInput
                invalid={props.passInvalid2}
                value={props.password2}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onChange={props.onChange}
                valid={props.passValid2}
                feedBack={props.passFeedBack2}
                type="password"
                name="password2"
                placeholder="Confirm Password"
                className="form-control"
                required
            />
            <FormGroup>
                <div
                    className={`form-check form-check-inline ${props.acceptTermsInvalid ? 'border-bottom border-danger' : ''}`}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="acceptTerms"
                        value="acceptTerms"
                        name="acceptTerms"
                        checked={props.acceptTerms}
                        onChange={props.onChange}
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
                <LoadingButton
                    text='Register Now'
                    onClick={props.onSubmit}
                    isWaitingResponse={props.isWaitingResponse}
                />
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

export default SignForm;