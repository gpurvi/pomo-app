import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import './../../styles/components/SessionName.css';

//todo implement dropdown for most used names
class SessionName extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);

        this.state = {

        }
    }

    onClickHandler() {

    }

    render() {
        const class1 = `dropinput`;
        const class2 = this.props.readOnly ? 'SessionName--readOnly' : undefined;
        return (
            <div className="dropdown">
                <input
                    onClick={this.onClickHandler}
                    className={`${class1} ${class2}`}
                    readOnly={this.props.readOnly}
                    onChange={this.props.onChangeHandler}
                    type="text"
                    placeholder="Enter session name"
                    value={this.props.sessionName}
                />
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        );
    }
}

export default SessionName;