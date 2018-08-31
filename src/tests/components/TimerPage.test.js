import React from 'react';
import {shallow} from 'enzyme';
import TimerPage from '../../components/TimerPage/TimerPage';

jest.mock('../../components/apiCalls.js');

describe('componentDidMount', () => {
    it('sets the state componentDidMount', async () => {
        const renderedComponent = await shallow(<TimerPage/>);
        await renderedComponent.update();
        expect(renderedComponent.state('sessions').length).toEqual(2);
    });

    it('sets the state componentDidMount on error', async () => {
        const renderedComponent = await shallow(<TimerPage/>);
        await renderedComponent.update();
        expect(renderedComponent.state('error')).toEqual('Error fetching sessions')
    })
});

describe('initStateFromServer', () => {
    it('gets state from server on initStateFromServer', async () => {
        const renderedComponent = shallow(<TimerPage/>);
        const serverState = await renderedComponent.instance().initStateFromServer();
        expect(serverState).toEqual({timerStarted: true});
    });

    it('sets the state initStateFromServer on error', async () => {
        const renderedComponent = shallow(<TimerPage/>);
        await renderedComponent.instance().initStateFromServer();
        expect(renderedComponent.state('error')).toEqual('Error fetching state')
    })
});

describe('putSessionState', () => {
    it('puts state on server', async () => {
        const renderedComponent = shallow(<TimerPage/>);
        const serverState = await renderedComponent.instance().putSessionState();
        expect(serverState).toBeTruthy();
    });

    it('sets the state putSessionState on error', async () => {
        const renderedComponent = shallow(<TimerPage/>);
        renderedComponent.instance().putSessionState();
        expect(renderedComponent.state('error')).toEqual('Error putting state')
    })
});

describe('postSession', () => {
    it('posts session on server', async () => {
        const renderedComponent = shallow(<TimerPage/>);
        const session = await renderedComponent.instance().postSession('', '', '');
        expect(session).toEqual([{"sessionName": "pomodor app", "duration": 1500000, "id": 1}]);
    });

    it('sets the state postSession on error', async () => {
        const renderedComponent = shallow(<TimerPage/>);
        await renderedComponent.instance().postSession('', '', '');
        expect(renderedComponent.state('error')).toEqual('Error posting sessions')
    })
});

// right now to much burden to test because so much edge cases
// describe('changeTimerStateOnServer', () => {
//     // it('put session state on server', async () => {
//     //     const renderedComponent = shallow(<TimerPage/>);
//     //     const baz = await renderedComponent.instance().changeTimerStateOnServer('simple', {});
//     //
//     //     expect(baz).toBe('bazz');
//     // });
//
//     it('sets the state and session on server', async () => {
//         const renderedComponent = shallow(<TimerPage/>);
//         // console.log(renderedComponent.state('sessions'));
//         renderedComponent.setState({sessions: []});
//         // expect(renderedComponent.state('error')).toEqual('Error fetching state');
//         await renderedComponent.instance().changeTimerStateOnServer('session', {});
//         expect(renderedComponent.state('sessions').length).toBe(1);
//     })
// });


