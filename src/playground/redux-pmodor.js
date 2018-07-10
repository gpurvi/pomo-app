import {combineReducers, createStore} from "redux";

const store = createStore(appReducer);

store.dispatch(timerStarted());

store.dispatch(setTimerEnd({timerEnd: 1000}));



console.log(store.getState());

// const demoState = {
//     timerStarted: false,
//     timerEnd: 0,
//     timerDuration: 10000,
//     currentLabel: ''
// };



