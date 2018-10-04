import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import AppRouter from './routers/AppRouters';
import {initTimer} from "./actions/timer";
// import {createDummyData} from "./dev/helpers";
// import {getSessions} from "./components/common/apiCalls";
//
// // document.write(createDummyData());
//
// getSessions('2017-05', 'month', true).then((data)=>{
//     console.log(data) ;
// });


const store = configureStore();
store.dispatch(initTimer());

const jsx = (
    <Provider store={store}>
        <AppRouter/>
        {/*<TimerBlockRedux*/}
        {/*full={true}*/}
        {/*/>*/}
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
