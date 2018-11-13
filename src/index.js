import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap-flaty.min.css';
import './styles/components/modal.css';
import './styles/components/loader.css';
import './styles/utils.css';
import './styles/components/chart-page.css';
// import './styles/components/login-page.css';
// import './styles/components/sign-page.css';
import AppRouter from './routers/AppRouters';
// import {checkTokenExists} from "./helpers/auth";
import {initApp} from "./actions/timer";
// // import {initApp} from "./actions/timer";
import {login} from "./actions/auth";
// import {initAuthFromExistingToken} from "./actions/auth";

// //set default headers for axios
// let token = document.querySelector('meta[name="csrf-token"]');
// axios.defaults.headers.common = {
//     'X-CSRF-TOKEN': token.content,
//     'X-Requested-With': 'XMLHttpRequest',
//     'Content-Type': 'application/json' // for development server
// };
// // //this also is set for development server
// axios.defaults.baseURL = 'http://localhost:3000';

// initAuthFromExistingToken();

// store.dispatch(initAuthFromExistingToken());
//
//
// const jsx = (
//     <Provider store={store}>
//         <AppRouter/>
//         {/*<Dropdown/>*/}
//         {/*<TimerBlockRedux*/}
//         {/*full={true}*/}
//         {/*/>*/}
//     </Provider>
// );
//
// // ReactDOM.render(jsx, document.getElementById('root'));
// // render app after all is loaded
// // store.dispatch(initApp()).then(() => {
// ReactDOM.render(jsx, document.getElementById('root'));
// // });

console.log('asdaaaaaaaaaaaaaaaaasd');

if (JSON.parse(localStorage.getItem('auth')) === true) {
    store.dispatch(login());
}


const jsx = (
    <Provider store={store}>
        <AppRouter/>
        {/*<Dropdown/>*/}
        {/*<TimerBlockRedux*/}
        {/*full={true}*/}
        {/*/>*/}


    </Provider>
);

// render app after all is loaded
store.dispatch(initApp()).then(() => {
    ReactDOM.render(jsx, document.getElementById('root'));
});



