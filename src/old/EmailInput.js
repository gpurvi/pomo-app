import React from 'react';
import {Form, FormGroup, Label, Button, Input, FormFeedback, FormText} from 'reactstrap';

class EmailInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid: false
        };

        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    onFocusHandler() {
        this.setState(() => ({invalid: false}));
    }


    render() {
        const {label, id, onChange, value, autoFocus, type, name, placeHolder, warning} = this.props;
        return (
            <FormGroup>
                <Label for={id}>
                    {label}
                </Label>
                <Input
                    onChange={onChange}
                    onFocus={this.onFocusHandler}
                    value={value}
                    autoFocus={autoFocus}
                    id={id}
                    invalid={this.state.invalid}
                    type={type}
                    className="form-control"
                    name={name}
                    placeholder={placeHolder}
                    required
                />
                <FormFeedback
                    className='position-absolute text-right'
                >
                    {warning}
                </FormFeedback>
            </FormGroup>
        );
    }
}

export default EmailInput;