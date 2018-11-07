import React from 'react';
import {connect} from 'react-redux';
import SettingInput from "./SettingInput";
import SettingCheck from './SettingCheck';
import {changeTimerSettings} from "../../actions/timer";
import {FormText, FormFeedback} from "reactstrap";


class RunSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            runContinuously: this.props.runContinuously,
            disabled: this.props.runContinuously,
            invalid: false
        };
        this.onInvalid = this.onInvalid.bind(this);
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
                runContinuously: true
            }));
        } else if (value === 'cycle') {
            this.props.dispatch(changeTimerSettings({
                runContinuously: false
            }));
            this.setState(() => ({
                runContinuously: false
            }));
        }
    }

    onInvalid(value) {
        this.setState(() => ({invalid: value}));
    }

    render() {
        return (
            <div>
                <h4>Run modes</h4>
                <div className='mt-3'>
                    <SettingCheck
                        id='runContinuously'
                        checked={this.state.runContinuously}
                        onChange={this.onChangeHandler}
                        name='runSet'
                        value='continuously'
                        label='Run continuously'
                    />
                    <br/>

                    <div className="form-group row">
                        <div className="col-5 col-form-label">
                            <SettingCheck
                                inline={true}
                                id='runCycles'
                                checked={!this.state.runContinuously}
                                onChange={this.onChangeHandler}
                                name='runSet'
                                value='cycle'
                                label='Run cycles'
                            />
                        </div>
                        <div className="col-7">
                            <SettingInput
                                disabled={this.state.runContinuously}
                                invalid={this.onInvalid}
                                maxValue={10}
                                id='notVeryGood'
                                value={this.props.cycleCount}
                                addBlock={this.props.addBlock}
                                removeBlock={this.props.removeBlock}
                                onBlur={this.onBlurHandler}
                                name='cycle'
                            />
                            <FormText
                                className={this.state.invalid ? 'd-none' : ''}
                            >
                                Enter number from 1 to 10
                            </FormText>
                            <FormFeedback>Must be number from 1 to 10</FormFeedback>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.timer
});

export default connect(mapStateToProps)(RunSettings);
