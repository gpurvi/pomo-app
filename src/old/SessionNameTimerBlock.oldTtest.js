import React from 'react';
import {shallow} from 'enzyme';
import SessionNameTimerBlock from './SessionNameTimerBlock';
import StopButton from '../components/buttons/StopButton';

test('', () => {
});

// const defaultServerState = {
//     timerDuration: 10000,
//     breakDuration: 10000,
//     breakTimerStarted: false,
//     timerStarted: false,
//     timerPaused: false,
//     timeLeft: 0,
//     sessionName: "",
//     timerEndAt: 0
// };
//
// describe('mount component and localeStorage is empty', () => {
//
//     test('state.timerStarted === true on fetched data', async () => {
//         localStorage.setItem('sessionState', null);
//         const serverState = {...defaultServerState, timerStarted: true};
//
//         const initStateFromServer = jest.fn().mockImplementation(() => new Promise((resolve) => {
//             resolve(serverState);
//         }));
//         const wrapper = await shallow(<SessionNameTimerBlock
//             initStateFromServer={initStateFromServer}
//         />);
//         expect(wrapper.state().timerDuration).toEqual(serverState.timerDuration);
//         expect(wrapper.state().timeLeft).not.toBe(serverState.timeLeft);
//         expect(JSON.parse(localStorage.getItem('sessionState'))).toEqual(serverState);
//     });
//
//     test('state.timerStarted === true and state.timerPaused === true ', async () => {
//         localStorage.removeItem('sessionState');
//         const serverState = {
//             ...defaultServerState,
//             timerPaused: true,
//             timerStarted: true
//         };
//         const initStateFromServer = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
//             resolve(serverState);
//         }));
//         const wrapper = await shallow(<SessionNameTimerBlock
//             initStateFromServer={initStateFromServer}
//         />);
//         expect(wrapper.state()).toEqual(serverState);
//         expect(JSON.parse(localStorage.getItem('sessionState'))).toEqual(serverState);
//     });
//
//     test('state.breakTimerStarted === true ', async () => {
//         localStorage.removeItem('sessionState');
//         const serverState = {...defaultServerState, breakTimerStarted: true};
//         const initStateFromServer = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
//             resolve(serverState);
//         }));
//         const wrapper = await shallow(<SessionNameTimerBlock
//             initStateFromServer={initStateFromServer}
//         />);
//         expect(wrapper.state().timerDuration).toEqual(serverState.timerDuration);
//         expect(wrapper.state().timeLeft).not.toBe(serverState.timeLeft);
//         expect(JSON.parse(localStorage.getItem('sessionState'))).toEqual(serverState);
//     });
// });
//
// describe('mount component and localeStorage is not empty', () => {
//
//     describe('state.timerStarted === true', () => {
//         test('should set state if timeLeft > 0', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 timerEndAt: new Date().valueOf() + 10000,
//                 timerStarted: true
//             };
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//             const initStateFromServer = jest.fn();
//
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//             />);
//             expect(wrapper.state().timerStarted).toBeTruthy();
//             expect(wrapper.state().timerPaused).toBeFalsy();
//             expect(wrapper.state().timeLeft).toBeGreaterThan(0);
//         });
//
//         test('should no set state if timeLeft < 0', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 timerEndAt: 0
//             };
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//             />);
//             expect(wrapper.state().timerStarted).toBeFalsy();
//             expect(wrapper.state().timerPaused).toBeFalsy();
//             expect(wrapper.state().timeLeft).not.toBeGreaterThan(0);
//         });
//
//         test('state.timerPaused === true', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 timerPaused: true,
//                 timerStarted: true,
//                 timeLeft: 10000
//             };
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//             />);
//
//             expect(wrapper.state().timerStarted).toBeTruthy();
//             expect(wrapper.state().timerPaused).toBeTruthy();
//             expect(wrapper.state().timeLeft).toBe(10000);
//         });
//     });
//
//     describe('state.breakTimerStarted === true', () => {
//
//         test('timeLeft > 0', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 breakTimerStarted: true,
//                 timerEndAt: new Date().valueOf() + 10000
//             };
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//             />);
//
//             expect(wrapper.state().breakTimerStarted).toBeTruthy();
//             expect(wrapper.state().timeLeft).toBeGreaterThan(0);
//         });
//     });
//
// });
//
// describe('startPauseClickHandler', () => {
//
//     test('should start timer', () => {
//         localStorage.removeItem('sessionState');
//         const localeState = {
//             ...defaultServerState
//         };
//         // this is needed for localStorage init
//         localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//         const initStateFromServer = jest.fn();
//         const changeTimerStateOnServer = jest.fn();
//         const wrapper = shallow(<SessionNameTimerBlock
//             initStateFromServer={initStateFromServer}
//             changeTimerStateOnServer={changeTimerStateOnServer}
//         />);
//         wrapper.instance().startPauseClickHandler();
//         expect(changeTimerStateOnServer).toHaveBeenCalled();
//         expect(wrapper.state().timerStarted).toBeTruthy();
//         expect(wrapper.state().timeLeft).toBe(defaultServerState.timerDuration);
//         expect(JSON.parse(localStorage.getItem('sessionState')).timerStarted).toBeTruthy();
//     });
//
//     test('should pause timer', () => {
//         localStorage.removeItem('sessionState');
//         const localeState = {
//             ...defaultServerState,
//             timerStarted: true,
//             // this is needed because it init working timer
//             timerEndAt: new Date().valueOf() + 100000,
//         };
//         // this is needed for localStorage init
//         localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//         const initStateFromServer = jest.fn();
//         const changeTimerStateOnServer = jest.fn();
//         const wrapper = shallow(<SessionNameTimerBlock
//             initStateFromServer={initStateFromServer}
//             changeTimerStateOnServer={changeTimerStateOnServer}
//         />);
//         wrapper.instance().startPauseClickHandler();
//         expect(changeTimerStateOnServer).toHaveBeenCalled();
//         expect(wrapper.state().timerPaused).toBeTruthy();
//         expect(JSON.parse(localStorage.getItem('sessionState')).timerPaused).toBeTruthy();
//     });
//
//     test('should resume timer', () => {
//         localStorage.removeItem('sessionState');
//         const localeState = {
//             ...defaultServerState,
//             timerPaused: true,
//             timerStarted: true,
//             timerEndAt: new Date().valueOf() + 100000
//         };
//         // this is needed for localStorage init
//         localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//         const initStateFromServer = jest.fn();
//         const changeTimerStateOnServer = jest.fn();
//         const wrapper = shallow(<SessionNameTimerBlock
//             initStateFromServer={initStateFromServer}
//             changeTimerStateOnServer={changeTimerStateOnServer}
//         />);
//         wrapper.instance().startPauseClickHandler();
//         expect(changeTimerStateOnServer).toHaveBeenCalled();
//         expect(wrapper.state().timerPaused).toBeFalsy();
//         expect(JSON.parse(localStorage.getItem('sessionState')).timerPaused).toBeFalsy();
//     });
// });
//
// describe('onStopHandler', () => {
//
//     describe('e object exists so button was pressed', () => {
//         test('state.timerStarted === true', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 timerStarted: true,
//                 // init running timer on mount
//                 timerEndAt: new Date().valueOf() + 100000
//             };
//             const modifiedSessionState = {
//                 ...localeState,
//                 breakTimerStarted: false,
//                 timerStarted: false,
//                 timerPaused: false,
//                 timerEndAt: 0,
//                 timeLeft: 0
//             };
//             // this is needed for localStorage init
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const changeTimerStateOnServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//                 changeTimerStateOnServer={changeTimerStateOnServer}
//             />);
//             // setState because timeLeft is calaculated different each time
//             wrapper.setState({timeLeft: 0});
//             // simulate button click with e as argument
//             wrapper.find(StopButton).prop('onStopHandler')({});
//             expect(changeTimerStateOnServer).toHaveBeenCalledWith(
//                 'session',
//                 modifiedSessionState,
//                 '',
//                 10000
//             );
//
//         });
//
//         test('state.breakTimerStarted === true', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 breakTimerStarted: true,
//                 timerEndAt: new Date().valueOf() + 100000
//             };
//             const modifiedSessionState = {
//                 ...localeState,
//                 breakTimerStarted: false,
//                 timerStarted: false,
//                 timerPaused: false,
//                 timerEndAt: 0,
//                 timeLeft: 0
//             };
//             // this is needed for localStorage init
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const changeTimerStateOnServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//                 changeTimerStateOnServer={changeTimerStateOnServer}
//             />);
//             // setState because timeLeft is calaculated different each time
//             wrapper.setState({timeLeft: 0});
//             // simulate button click with e as argument
//             wrapper.find(StopButton).prop('onStopHandler')({});
//             expect(changeTimerStateOnServer).toHaveBeenCalledWith(
//                 'break',
//                 modifiedSessionState,
//             );
//         });
//     });
//
//     describe('e object doesnt exists so stopped from Timer comp', () => {
//
//         test('state.breakTimerStarted === false start breakTimer', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 timerStarted: true,
//                 timerEndAt: new Date().valueOf() + 100000,
//             };
//             const modifiedSessionState = {
//                 ...localeState,
//                 breakTimerStarted: true,
//                 timerStarted: false,
//                 timerPaused: false,
//                 timeLeft: defaultServerState.breakDuration
//             };
//             // this is needed for localStorage init
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const changeTimerStateOnServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//                 changeTimerStateOnServer={changeTimerStateOnServer}
//             />);
//             //for avoiding inconsitency at timerEndAt
//             wrapper.setState({timerEndAt: 1000});
//             wrapper.instance().onStopHandler();
//
//             expect(changeTimerStateOnServer).toHaveBeenCalled();
//         });
//
//
//         test('ends timer', () => {
//             localStorage.removeItem('sessionState');
//             const localeState = {
//                 ...defaultServerState,
//                 breakTimerStarted: true,
//                 timerEndAt: new Date().valueOf() + 100000
//             };
//             const modifiedSessionState = {
//                 ...localeState,
//                 breakTimerStarted: false,
//                 timerEndAt: 0,
//                 timeLeft: 0
//             };
//             // this is needed for localStorage init
//             localStorage.setItem('sessionState', JSON.stringify(localeState));
//
//             const initStateFromServer = jest.fn();
//             const changeTimerStateOnServer = jest.fn();
//             const wrapper = shallow(<SessionNameTimerBlock
//                 initStateFromServer={initStateFromServer}
//                 changeTimerStateOnServer={changeTimerStateOnServer}
//             />);
//             wrapper.instance().onStopHandler();
//             expect(changeTimerStateOnServer).toHaveBeenCalledWith(
//                 'break',
//                 modifiedSessionState
//             );
//         });
//     });
// });
//
// test('onTickHandler', () => {
//     localStorage.removeItem('sessionState');
//     const localeState = {
//         ...defaultServerState,
//         timerEndAt: 10000,
//         timeLeft: 0
//     };
//     localStorage.setItem('sessionState', JSON.stringify(localeState));
//     const initStateFromServer = jest.fn();
//     const wrapper = shallow(<SessionNameTimerBlock
//         initStateFromServer={initStateFromServer}
//     />);
//     wrapper.instance().onTickHandler();
//     expect(wrapper.state().timeLeft).toBe(-1000);
// });
//
//
