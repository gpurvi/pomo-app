import React from 'react';
import {connect} from 'react-redux';
import SettingInput from "./SettingInput";
import {changeTimerSettings} from "../../actions/timer";

class RunSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cycle: !this.props.runContinuously,
            disabled: this.props.runContinuously
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onBlurHandler(e, cycleCount) {
        this.props.dispatch(changeTimerSettings({
            cycleCount
        }));
    }

    onChangeHandler(e) {
        const {value} = e.target;
        if (value === 'continuously') {
            this.props.dispatch(changeTimerSettings({
                runContinuously: true
            }));
            this.setState(() => ({
                cycle: false,
                disabled: true
            }));
        } else if (value === 'cycle') {
            this.props.dispatch(changeTimerSettings({
                runContinuously: false
            }));
            this.setState(() => ({
                cycle: true,
                disabled: false
            }));
        }
    }

    render() {
        return (
            <div>
                <p>Run modes</p>
                <label>
                    <input
                        checked={!this.state.cycle}
                        onChange={this.onChangeHandler}
                        type='radio'
                        name='runSet'
                        value='continuously'
                    />
                    run continuously
                </label>

                <br/>

                <label>
                    <input
                        checked={this.state.cycle}
                        onChange={this.onChangeHandler}
                        type='radio'
                        name='runSet'
                        value='cycle'
                    />
                    run cycles
                </label>

                <SettingInput
                    disabled={this.state.disabled}
                    value={this.props.cycleCount}
                    addBlock={this.props.addBlock}
                    removeBlock={this.props.removeBlock}
                    onBlur={this.onBlurHandler}
                    label='Cycle count'
                    name='cycle'
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(RunSettings);
