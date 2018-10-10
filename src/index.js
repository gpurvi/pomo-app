import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import AppRouter from './routers/AppRouters';
import {initApp} from "./actions/timer";
// import {getAppState} from "./components/common/apiCalls";
// import {getMinDate} from "./components/common/apiCalls";
// import {createDummyData} from "./dev/helpers";
// import {getSessions} from "./components/common/apiCalls";
//
// // document.write(createDummyData());
//

// getAppState().then((data)=> console.log(data));

const store = configureStore();
store.dispatch(initApp());

const jsx = (
    <Provider store={store}>
        <AppRouter/>
        {/*<TimerBlockRedux*/}
        {/*full={true}*/}
        {/*/>*/}
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
