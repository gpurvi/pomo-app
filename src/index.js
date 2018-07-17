import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DateSessions from './components/DateSessions';

// import SessionNameTimerBlock from "./components/SessionNameTimerBlock";

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
//
// <SessionNameTimerBlock
//     defaultSessionName="app"
//     defaultTimerDuration={5000}/>


ReactDOM.render(<DateSessions/> , document.getElementById('root'));
