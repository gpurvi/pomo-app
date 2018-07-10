import React, {Component} from 'react';
import Timer from './components/Timer';
import './App.css';

// import Timer from './playground/timer';


class App extends Component {
    render() {
        return (
            <div className="App">
                <input/>
                <Timer/>
            </div>
        );
    }
}

export default App;
