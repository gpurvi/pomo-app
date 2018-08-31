import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routers/AppRouters';
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


// const startdate = moment().subtract(10, 'months');
//
// console.log(createDummyData(startdate, 'bar'));

ReactDOM.render(<AppRouter/>, document.getElementById('root'));
