import React from 'react';
import {Prompt} from "react-router-dom";
import RunSettings from "./RunSettings";
import DurationSettings from "./DurationSettings";

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

    removeBlock() {
        this.setState((prevState) => ({isBlocking: --prevState.isBlocking}))
    }

    addBlock() {
        this.setState((prevState) => ({isBlocking: ++prevState.isBlocking}))
    }

    render() {
        return (
            <div className='container mt-7 pt-3'>
                <Prompt
                    when={this.state.isBlocking > 0}
                    message={() =>
                        'Some fields are incorrectly set and won\'t be saved'
                    }
                />

                <DurationSettings
                    addBlock={this.addBlock}
                    removeBlock={this.removeBlock}
                />

                <div className="col-12">
                    <hr/>
                </div>

                <RunSettings
                    addBlock={this.addBlock}
                    removeBlock={this.removeBlock}
                />

            </div>
        );
    }
}


export default SettingsPage;