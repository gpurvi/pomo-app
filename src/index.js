import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import './styles/bootstrap-flaty.min.css';
import './styles/components/modal.css';
import './styles/components/loader.css';
import './styles/utils.css';
import './styles/components/chart-page.css';
import AppRouter from './routers/AppRouters';
import {checkAuth} from "./actions/auth";
// import {checkTokenExists} from "./helpers/auth";
// import {initApp} from "./actions/timer";


store.dispatch(checkAuth());

// // ReactDOM.render(jsx, document.getElementById('root'));
// // render app after all is loaded
// // store.dispatch(initApp()).then(() => {
// ReactDOM.render(jsx, document.getElementById('root'));
// // });


const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

// render app after all is loaded
// store.dispatch(initApp()).then(() => {
ReactDOM.render(jsx, document.getElementById('root'));
// });



