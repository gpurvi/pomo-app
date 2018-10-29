import React from 'react';
import {Input} from 'reactstrap';

class SettingInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            block: false,
            invalid: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onChangeHandler(e) {
        const {value} = e.target;
        const regex = /^\s|^0|\D/;
        if (!regex.test(value)) {
            this.setState(() => ({
                value,
                invalid: false
            }));
            this.props.invalid(false);
            if (this.state.block) {
                this.props.removeBlock();
                this.setState(() => ({
                    block: false
                }));
            }
        }
    }

    onBlurHandler(e) {
        const {value} = e.target;
        const numberValue = (Number.parseInt(value, 10));
        if (value === '' || numberValue > this.props.maxValue) {
            this.setState(() => ({invalid: true}));
            this.props.invalid(true);
            if (!this.state.block) {
                this.props.addBlock();
                this.setState(() => ({
                    block: true
                }));
            }
        } else {
            this.props.onBlur(e, numberValue);
        }
    }

    render() {
        const {id, disabled, name} = this.props;
        const {value, invalid} = this.state;
        return (
            <Input
                disabled={disabled}
                id={id}
                onChange={this.onChangeHandler}
                onBlur={this.onBlurHandler}
                name={name}
                value={value}
                invalid={invalid}
                type='text'
            />
        );
    }
}

export default SettingInput;
