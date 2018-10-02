import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import AppRouter from './routers/AppRouters';
import {initTimer} from "./actions/timer";
// import TimerPage from './components/TimerPage';
// import ChartPage from "./components/ChartPage";
// import ChartDatePicker from "./components/ChartDatePicker";
// import ChartButtons from "./components/ChartButtons";
// import ChartPage from "./components/ChartPage";
// import LineChart1 from "./components/LineChart1";
// import ChartBlock from "./components/ChartBlock";
// import ChartPage from "./components/ChartPage/ChartPage";
// import TimerPage from "./components/TimerPage/TimerPage";
// import TimerPage from "./components/TimerPage/TimerPage";
// import SessionNameTimerBlock from "./components/SessionNameTimerBlock";
// import {createDummyData} from "./playground/createDummydata";
// import Chart from "./components/ChartPage/Chart";
// import moment from 'moment';


// import MainPage from './components/MainPage';
// import './playground/redux-pmodor';

const store = configureStore();
// const sessionState = JSON.parse(localStorage.getItem('sessionState'));
// const state = {
//     timerDuration: 5000,
//     breakDuration: 5000,
//     breakTimerStarted: false,
//     timerStarted: false,
//     timerPaused: false,
//     timeLeft: 0,
//     sessionName: "",
//     timerEndAt: 0,
//     breakTimerEndAt: 0
// };
// localStorage.setItem('sessionState', JSON.stringify(state));
store.dispatch(initTimer());
const jsx = (
    <Provider store={store}>
        <AppRouter/>
        {/*<TimerBlockRedux*/}
        {/*full={true}*/}
        {/*/>*/}
    </Provider>
);


// const startdate = moment().subtract(10, 'months');
//
// console.log(createDummyData(startdate, 'bar'));

ReactDOM.render(jsx, document.getElementById('root'));
