import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/components/modal.css';
// import './styles/components/login-page.css';
// import './styles/components/sign-page.css';
import AppRouter from './routers/AppRouters';
import {initApp} from "./actions/timer";
import {login} from "./actions/auth";

// import Dropdown from "./components/common/Dropdown";
// import DropdownV1 from "./components/common/DropdownV1";
// import {getAppState} from "./components/common/apiCalls";
// import {getMinDate} from "./components/common/apiCalls";
// import {createDummyData} from "./dev/helpers";
// import {getSessions} from "./components/common/apiCalls";
//
// // document.write(createDummyData());
//

// getAppState().then((data)=> console.log(data));

const store = configureStore();

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




