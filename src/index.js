import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SessionNameTimerBlock from "./components/SessionNameTimerBlock";

// import {Provider} from 'react-redux';
// import MainPage from './components/MainPage';
// import configureStore from './store/configureStore';
// import './playground/redux-pmodor';

// const store = configureStore();

// const jsx = (
//     <Provider store={store}>
//         <MainPage/>
//     </Provider>
// );


ReactDOM.render(<SessionNameTimerBlock
    defaultSessionName="app"
    defaultTimerDuration={5000}/>, document.getElementById('root'));
