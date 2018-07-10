import {createStore} from 'redux';


const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

//reducers

const countReducers = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        default:
            return state
    }
};

const store = createStore(countReducers);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch({
    type: 'DECREMENT'
});
