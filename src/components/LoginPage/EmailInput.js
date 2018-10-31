import React from 'react';
import {Form, FormGroup, Row, Label, Button, Input, FormFeedback, FormText} from 'reactstrap';
import SimpleInput from "./SimpleInput";

// const SimpleInput = ({type, valid, name, onFocus, onBlur, value, onChange, invalid, placeholder, feedBack}) => (
//     <FormGroup>
//         <Input
//             invalid={invalid}
//             value={value}
//             onFocus={onFocus}
//             onChange={onChange}
//             onBlur={onBlur}
//             type={type}
//             className="form-control"
//             name={name}
//             placeholder={placeholder}
//             required
//             valid={valid}
//         />
//         <FormFeedback className='position-absolute'>{feedBack}</FormFeedback>
//     </FormGroup>
//
// );
//


class EmailInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invalid: false
        };
        //
        // this.onFocus = this.onFocus.bind(this);
        // this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
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
        // //todo implement login submit
        // this.props.dispatch(login());
    }

    render() {
        const {name, onFocus, value, onChange, invalid, placeholder, feedBack} = this.props;
        return (
            <SimpleInput
                invalid={this.state.lastNameInvalid}
                value={this.state.lastName}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onChange={onChange}
                feedBack='This field is required'
                type="text"
                className="form-control"
                name='lastName'
                placeholder='Last Name'
                required
                valid={this.state.lastNameValid}
            />
        );
    }
}

export default EmailInput;
