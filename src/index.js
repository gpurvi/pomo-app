import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/components/modal.css';
// import './index.css';
import AppRouter from './routers/AppRouters';
import {initApp} from "./actions/timer";

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




