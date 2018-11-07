import React from 'react';
import {Form, FormGroup, Label, Button, Input, FormFeedback} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from "../../actions/auth";

class ForgotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailInvalid: false,
            emailFeedBack: 'Enter email address',
            successReset: false,
            failedReset: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {email} = this.state;
        if (email === '') {
            this.setState(() => ({emailInvalid: true}));
            return;
        }

        this.setState(() => ({successReset: true}));
        // this.setState(() => ({failedReset: true}));


        //todo implement email reset feedback
        // setTimeout(() => {
        //     this.props.dispatch(login());
        //     // this.setState(() => ({failedLogin: true}));
        // }, 1000);
    }

    onFocus() {
        this.setState(() => ({emailInvalid: false}));
    }

    onChange(e) {
        const {value} = e.target;
        this.setState(() => ({email: value}));
    }

    render() {
        // const {username, userInvalid} = this.state;
        return (
            <div className="wrapper">

                <Form className="form-signin">
                    {this.state.successReset ? (
                        <p className='text-center pt-3'>
                            Your new password was sent to email.
                        </p>
                    ) : (
                        <div>
                            <h4>Forgot your password?</h4>
                            <p>Enter your email address to recover your password</p>
                            {
                                this.state.failedReset && (
                                    <div className='alert-danger p-2'>
                                        Email address is not registered
                                    </div>
                                )
                            }

                            <FormGroup>
                                <Label for='forgotEmail'>
                                    Email:
                                </Label>
                                <Input
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    value={this.state.email}
                                    invalid={this.state.emailInvalid}
                                    id='forgotEmail'
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email Address"
                                    required
                                    autoFocus
                                />

                                <FormFeedback
                                    className='position-absolute text-right'
                                >
                                    {this.state.emailFeedBack}
                                </FormFeedback>
                            </FormGroup>

                            <Button
                                className='mt-4'
                                onClick={this.onSubmit}
                                size='lg'
                                color='primary'
                                block
                            >
                                Reset password
                            </Button>
                        </div>
                    )}

                    <div className='text-size--small mt-4 text-center'>
                        <div>
                            <Link to='/'>Back to login</Link>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}


export default connect()(ForgotPage);
// export default LoginPage;