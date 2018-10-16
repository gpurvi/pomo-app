import React from 'react';
import {connect} from 'react-redux';
import {Prompt} from "react-router-dom";
// import {Setting} from "./Setting";
// import SettingText from "./SettingText";
// import {changeTimerSettings} from "../../actions/timer";
// import SettingInput from "./SettingInput";
// // import SettingCheck from "./SettingCheck";
import RunSettings from "./RunSettings";
import DurationBlock from "./DurationBlock";

class SettingsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playSound: true,
            runContinuously: false,
            isBlocking: 0
        };

        this.addBlock = this.addBlock.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
    }


    // componentWillUnmount() {
    //     // window.addEventListener('beforeunload', function (e) {
    //     //     // Cancel the event as stated by the standard.
    //     //     e.preventDefault();
    //     //     // Chrome requires returnValue to be set.
    //     //     e.returnValue = '';
    //     // });
    //     // console.log(this.state.isBlocking);
    // }

    // componentDidMount(){
    //     window.addEventListener('beforeunload', (e)=> {
    //         e.preventDefault();
    //         e.returnValue = '';
    //         alert();
    //     });
    // }

    removeBlock() {
        this.setState((prevState) => ({isBlocking: --prevState.isBlocking}))
    }

    addBlock() {
        this.setState((prevState) => ({isBlocking: ++prevState.isBlocking}))
    }

    render() {
        return (
            <div>
                <Prompt
                    when={this.state.isBlocking > 0}
                    message={location =>
                        `Are you sure you want to go to ${location.pathname}`
                    }
                />

                <DurationBlock
                    addBlock={this.addBlock}
                    removeBlock={this.removeBlock}
                />


                <RunSettings
                    addBlock={this.addBlock}
                    removeBlock={this.removeBlock}
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(SettingsPage);