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
            <div className='container mt-6 pt-3'>
                <Prompt
                    when={this.state.isBlocking > 0}
                    message={location =>
                        `Are you sure you want to go to ${location.pathname}`
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