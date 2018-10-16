import React from 'react';

class SettingInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            error: '',
            block: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onChangeHandler(e) {
        const {value} = e.target;
        const regex = /^\s|^0|\D/;
        if (!regex.test(value)) {
            this.setState(() => ({
                error: '',
                value
            }));
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
        if (value === '') {
            this.setState(() => ({
                error: `Invalid value. Must be number from  1 - 360. 
            Changes won't be saved.`
            }));

            if (!this.state.block) {
                this.props.addBlock();
                this.setState(() => ({
                    block: true
                }));
            }
        } else {
            this.props.onBlur(e, Number.parseInt(value, 10));
        }
    }

    render() {
        return (
            <div>
                <label
                    // className={this.props.disabled && 'disabled-label'}
                >
                    {this.props.label}
                    <input
                        disabled={this.props.disabled}
                        name={this.props.name}
                        onBlur={this.onBlurHandler}
                        type='text'
                        onChange={this.onChangeHandler}
                        value={this.state.value}
                    />
                </label>
                {
                    this.state.error &&
                    <p>{this.state.error}</p>
                }
            </div>

        );
    }
}

export default SettingInput;
