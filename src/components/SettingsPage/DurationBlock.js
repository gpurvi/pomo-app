import React from 'react';
import {connect} from 'react-redux';
import {changeTimerSettings} from "../../actions/timer";
import SettingInput from "./SettingInput";

class DurationBlock extends React.Component {

    constructor(props) {
        super(props);

        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onBlurHandler(e, duration) {
        const {name} = e.target;

        if (name === 'session') {
            this.props.dispatch(changeTimerSettings({
                'timerDuration': this.convertTo(duration, 'toMilis')
            }));
        } else if (name === 'break') {
            this.props.dispatch(changeTimerSettings({
                'breakDuration': this.convertTo(duration, 'toMilis')
            }));
        }

    }

    convertTo(amount, type) {
        if (type === 'toMilis') {
            return amount * 60000;
        } else if (type === 'toMin') {
            return amount / 60000;
        }
    }

    render() {
        const convertedTimer = this.convertTo(this.props.timerDuration, 'toMin');
        const convertedBreak = this.convertTo(this.props.breakDuration, 'toMin');
        return (
            <div>
                <SettingInput
                    value={convertedTimer}
                    addBlock={this.props.addBlock}
                    removeBlock={this.props.removeBlock}
                    onBlur={this.onBlurHandler}
                    stateVar='timerDuration'
                    label='Session duration'
                    name='session'
                />

                <SettingInput
                    value={convertedBreak}
                    addBlock={this.props.addBlock}
                    removeBlock={this.props.removeBlock}
                    onBlur={this.onBlurHandler}
                    stateVar='breakDuration'
                    label='Break duration'
                    name='break'
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(DurationBlock);
