import React from 'react';
import {connect} from 'react-redux';
import {changeTimerSettings} from "../../actions/timer";

class SettingCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // value: this.convertTo(this.props[this.props.stateVar], 'toMin'),
            // error: '',
            // addBlockCalled: false,
            // removeBlockCalled: false,
            // block: false
            checked: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        // this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onChangeHandler() {
        // const {checked} = e.target;
        this.setState((prevState) => ({checked: !prevState.checked}));
    }

    // onBlurHandler(e) {
    //     const {value} = e.target;
    //     if (value === '') {
    //         this.setState(() => ({
    //             error: `Invalid value. Must be number from  1 - 360.
    //         Changes won't be saved.`
    //         }));
    //
    //         if (!this.state.block) {
    //             this.props.addBlock();
    //             this.setState(() => ({
    //                 block: true
    //             }));
    //         }
    //     } else {
    //         const duration = Number.parseInt(value, 10);
    //         const stateVar = this.props.stateVar;
    //         //using dynamic object prop names
    //         this.props.dispatch(changeTimerSettings({
    //             [stateVar]: this.convertTo(duration, 'toMilis')
    //         }));
    //     }
    // }

    // convertTo(amount, type) {
    //     if (type === 'toMilis') {
    //         return amount * 60000;
    //     } else if (type === 'toMin') {
    //         return amount / 60000;
    //     }
    // }

    render() {
        return (
            <div>
                {this.props.name}
                <input
                    onChange={this.onChangeHandler}
                    // onBlur={this.onBlurHandler}
                    type='checkbox'
                    checked={this.state.checked}
                />

                {
                    this.state.error &&
                    <p>{this.state.error}</p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(SettingCheck);
