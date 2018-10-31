import React from 'react';
import {FormGroup, Input, FormFeedback, FormText} from 'reactstrap';

const SimpleInput = ({formText, type, valid, name, onFocus, onBlur, value, onChange, invalid, placeholder, feedBack}) => (
    <FormGroup>
        <Input
            invalid={invalid}
            value={value}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            className="form-control"
            name={name}
            placeholder={placeholder}
            required
            valid={valid}
        />
        <FormFeedback className='position-absolute'>{feedBack}</FormFeedback>
        {formText && (
            <FormText
                className={`position-absolute password-hint ${invalid ? 'd-none' : ''}`}
            >{formText}</FormText>
        )}
    </FormGroup>

);

export default SimpleInput;

//
// class SimpleInput extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             invalid: false
//         };
//         //
//         // this.onFocus = this.onFocus.bind(this);
//         // this.onChange = this.onChange.bind(this);
//
//     }
//
//
//     // onFocus(e) {
//     //     this.props.onFocus();
//     //     // this.setState(() => ({userInvalid: false}));
//     //     // const {name} = e.target;
//     //     // if (name === 'username') {
//     //     // }
//     //     // if (name === 'password') {
//     //     //     this.setState(() => ({passInvalid: false}));
//     //     // }
//     // }
//     //
//     // onChange(e) {
//     //     const {name, value} = e.target;
//     //     if (name === 'username') {
//     //         this.setState(() => ({username: value}));
//     //     }
//     //     if (name === 'password') {
//     //         this.setState(() => ({password: value}));
//     //     }
//     // }
//
//     render() {
//         const {name, onFocus, value, onChange, invalid, placeholder, feedBack} = this.props;
//         return (
//
//         );
//     }
// }