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
