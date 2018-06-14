import React, {Component} from 'react';
import './MainPage.css';
import Timer from './Timer/Timer';




class MainPage extends Component {

    render() {
        return (
            <div className="MainPage">
                <input/>
                <Timer startTimer/>
                <button>Start</button>
            </div>
        );
    }
}

export default MainPage;