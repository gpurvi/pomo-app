import React from 'react';
import {shallow} from 'enzyme';
import SessionNameTimerBlock from '../../components/TimerPage/SessionNameTimerBlock';
import StopButton from '../../components/buttons/StopButton';

const defaultServerState = {
    timerDuration: 10000,
    breakDuration: 10000,
    breakTimerStarted: false,
    timerStarted: true,
    timerPaused: false,
    timeLeft: 0,
    sessionName: "",
    timerEndAt: 0
};

describe('mount component and localeStorage is empty', () => {

    test('state.timerStarted === true on fetched data', async () => {
        localStorage.setItem('sessionState', null);
        const serverState = defaultServerState;

        const initStateFromServer = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
            resolve(serverState);
        }));
        const wrapper = await shallow(<SessionNameTimerBlock
            initStateFromServer={initStateFromServer}
        />);
        // await wrapper.update();
        expect(wrapper.state().timerDuration).toEqual(serverState.timerDuration);
        expect(wrapper.state().timeLeft).not.toBe(serverState.timeLeft);
        expect(JSON.parse(localStorage.getItem('sessionState'))).toEqual(serverState);
    });

    test('state.timerStarted === true and state.timerPaused === true ', async () => {
        localStorage.removeItem('sessionState');
        const serverState = {...defaultServerState, timerPaused: true};
        const initStateFromServer = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
            resolve(serverState);
        }));
        const wrapper = await shallow(<SessionNameTimerBlock
            initStateFromServer={initStateFromServer}
        />);
        // await wrapper.update();
        expect(wrapper.state()).toEqual(serverState);
        expect(JSON.parse(localStorage.getItem('sessionState'))).toEqual(serverState);
    });

    test('state.breakTimerStarted === true ', async () => {
        localStorage.removeItem('sessionState');
        const serverState = {...defaultServerState, breakTimerStarted: true};
        const initStateFromServer = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
            resolve(serverState);
        }));
        const wrapper = await shallow(<SessionNameTimerBlock
            initStateFromServer={initStateFromServer}
        />);
        // await wrapper.update();
        expect(wrapper.state().timerDuration).toEqual(serverState.timerDuration);
        expect(wrapper.state().timeLeft).not.toBe(serverState.timeLeft);
        expect(JSON.parse(localStorage.getItem('sessionState'))).toEqual(serverState);
    });
});

describe('mount component and localeStorage is not empty', () => {

    describe('state.timerStarted === true', () => {
        test('should set state if timeLeft > 0', () => {
            localStorage.removeItem('sessionState');
            const localeState = {...defaultServerState, timerEndAt: new Date().valueOf() + 10000};
            localStorage.setItem('sessionState', JSON.stringify(localeState));
            const initStateFromServer = jest.fn();

            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
            />);
            expect(wrapper.state().timerStarted).toBeTruthy();
            expect(wrapper.state().timerPaused).toBeFalsy();
            expect(wrapper.state().timeLeft).toBeGreaterThan(0);
        });

        test('should no set state if timeLeft < 0', () => {
            localStorage.removeItem('sessionState');
            const localeState = {...defaultServerState, timerEndAt: 0};
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
            />);
            expect(wrapper.state().timerStarted).toBeFalsy();
            expect(wrapper.state().timerPaused).toBeFalsy();
            expect(wrapper.state().timeLeft).not.toBeGreaterThan(0);
        });

        test('state.timerPaused === true', () => {
            localStorage.removeItem('sessionState');
            const localeState = {
                ...defaultServerState,
                timerPaused: true,
                timeLeft: 10000
            };
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
            />);

            expect(wrapper.state().timerStarted).toBeTruthy();
            expect(wrapper.state().timerPaused).toBeTruthy();
            expect(wrapper.state().timeLeft).toBe(10000);
        });
    });

    describe('state.breakTimerStarted === true', () => {

        test('timeLeft > 0', () => {
            localStorage.removeItem('sessionState');
            const localeState = {
                ...defaultServerState,
                breakTimerStarted: true,
                timerStarted: false,
                timerEndAt: new Date().valueOf() + 10000
            };
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
            />);

            expect(wrapper.state().breakTimerStarted).toBeTruthy();
            expect(wrapper.state().timeLeft).toBeGreaterThan(0);
        });
    });

});

describe('startPauseClickHandler', () => {

    test('should start timer', () => {
        localStorage.removeItem('sessionState');
        const localeState = {
            ...defaultServerState,
            breakTimerStarted: false,
            timerPaused: false,
            timerStarted: false,
            timerEndAt: new Date().valueOf() + 100000,
            timerDuration: 1000
        };
        // this is needed for localStorage init
        localStorage.setItem('sessionState', JSON.stringify(localeState));

        const initStateFromServer = jest.fn();
        const changeTimerStateOnServer = jest.fn();
        const wrapper = shallow(<SessionNameTimerBlock
            initStateFromServer={initStateFromServer}
            changeTimerStateOnServer={changeTimerStateOnServer}
        />);
        wrapper.instance().startPauseClickHandler();
        expect(changeTimerStateOnServer).toHaveBeenCalled();
        expect(wrapper.state().timerStarted).toBeTruthy();
        expect(wrapper.state().timeLeft).toBe(1000);
    });

    test('should stop timer', () => {
        localStorage.removeItem('sessionState');
        const localeState = {
            ...defaultServerState,
            breakTimerStarted: false,
            timerPaused: false,
            timerStarted: true,
            timerEndAt: new Date().valueOf() + 100000,
            timerDuration: 1000
        };
        // this is needed for localStorage init
        localStorage.setItem('sessionState', JSON.stringify(localeState));

        const initStateFromServer = jest.fn();
        const changeTimerStateOnServer = jest.fn();
        const wrapper = shallow(<SessionNameTimerBlock
            initStateFromServer={initStateFromServer}
            changeTimerStateOnServer={changeTimerStateOnServer}
        />);
        wrapper.instance().startPauseClickHandler();
        expect(changeTimerStateOnServer).toHaveBeenCalled();
        expect(wrapper.state().timerPaused).toBeTruthy();
        expect(JSON.parse(localStorage.getItem('sessionState')).timerPaused).toBeTruthy();
    });

    test('should resume timer', () => {
        localStorage.removeItem('sessionState');
        const localeState = {
            ...defaultServerState,
            breakTimerStarted: false,
            timerPaused: true,
            timerStarted: true,
            timerEndAt: new Date().valueOf() + 100000,
            timerDuration: 1000
        };
        // this is needed for localStorage init
        localStorage.setItem('sessionState', JSON.stringify(localeState));

        const initStateFromServer = jest.fn();
        const changeTimerStateOnServer = jest.fn();
        const wrapper = shallow(<SessionNameTimerBlock
            initStateFromServer={initStateFromServer}
            changeTimerStateOnServer={changeTimerStateOnServer}
        />);
        wrapper.instance().startPauseClickHandler();
        expect(changeTimerStateOnServer).toHaveBeenCalled();
        expect(wrapper.state().timerPaused).toBeFalsy();
        expect(JSON.parse(localStorage.getItem('sessionState')).timerPaused).toBeFalsy();
    });
});

describe('onStopHandler', () => {

    describe('e object exists so button was pressed', () => {

        test('state.timerStarted === true', () => {
            localStorage.removeItem('sessionState');
            const localeState = {
                ...defaultServerState,
                breakTimerStarted: false,
                timerPaused: false,
                timerStarted: true,
                timerEndAt: new Date().valueOf() + 100000,
                timerDuration: 1000
            };
            const modifiedSessionState = {
                ...localeState,
                breakTimerStarted: false,
                timerStarted: false,
                timerPaused: false,
                timerEndAt: 0,
                timeLeft: 0
            };
            // this is needed for localStorage init
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const changeTimerStateOnServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
                changeTimerStateOnServer={changeTimerStateOnServer}
            />);
            // setState because timeLeft is calaculated different each time
            wrapper.setState({timeLeft: 0});
            // simulate button click with e as argument
            wrapper.find(StopButton).prop('onStopHandler')({});
            expect(changeTimerStateOnServer).toHaveBeenCalledWith(
                'session', modifiedSessionState,
                '',
                1000
            );

        });

        test('state.breakTimerStarted === true', () => {
            localStorage.removeItem('sessionState');
            const localeState = {
                ...defaultServerState,
                breakTimerStarted: true,
                timerPaused: false,
                timerStarted: false,
                timerEndAt: new Date().valueOf() + 100000,
                timerDuration: 1000
            };
            const modifiedSessionState = {
                ...localeState,
                breakTimerStarted: false,
                timerStarted: false,
                timerPaused: false,
                timerEndAt: 0,
                timeLeft: 0
            };
            // this is needed for localStorage init
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const changeTimerStateOnServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
                changeTimerStateOnServer={changeTimerStateOnServer}
            />);
            // setState because timeLeft is calaculated different each time
            wrapper.setState({timeLeft: 0});
            // simulate button click with e as argument
            wrapper.find(StopButton).prop('onStopHandler')({});
            expect(changeTimerStateOnServer).toHaveBeenCalledWith(
                'break',
                modifiedSessionState,
            );
        });
    });

    describe('e object doesnt exists so stopped from Timer comp', () => {
        test('state.breakTimerStarted === false start breakTimer', () => {
            localStorage.removeItem('sessionState');
            const localeState = {
                ...defaultServerState,
                breakTimerStarted: false,
                timerPaused: false,
                timerStarted: true,
                timerEndAt: new Date().valueOf() + 100000,
                timerDuration: 1000
            };
            const modifiedSessionState = {
                ...localeState,
                breakTimerStarted: true,
                timerStarted: false,
                timerPaused: false,
                timeLeft: 10000
            };
// this is needed for localStorage init
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const changeTimerStateOnServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
                changeTimerStateOnServer={changeTimerStateOnServer}
            />);
            //for avoiding inconsitency at timerEndAt
            wrapper.setState({timerEndAt: 1000});
            wrapper.instance().onStopHandler();

            expect(changeTimerStateOnServer).toHaveBeenCalled();
        });


        test('ends timer', () => {
            localStorage.removeItem('sessionState');
            const localeState = {
                ...defaultServerState,
                breakTimerStarted: true,
                timerPaused: false,
                timerStarted: true,
                timerEndAt: new Date().valueOf() + 100000,
                timerDuration: 1000
            };
            const modifiedSessionState = {
                ...localeState,
                breakTimerStarted: false,
                timerEndAt: 0,
                timeLeft: 0
            };
// this is needed for localStorage init
            localStorage.setItem('sessionState', JSON.stringify(localeState));

            const initStateFromServer = jest.fn();
            const changeTimerStateOnServer = jest.fn();
            const wrapper = shallow(<SessionNameTimerBlock
                initStateFromServer={initStateFromServer}
                changeTimerStateOnServer={changeTimerStateOnServer}
            />);
            //for avoiding inconsitency at timerEndAt
            wrapper.instance().onStopHandler();

            expect(changeTimerStateOnServer).toHaveBeenCalledWith(
                'break',
                modifiedSessionState
            );
        });
    });
});


test('onTickHandler', () => {
    localStorage.removeItem('sessionState');
    const localeState = {
        ...defaultServerState,
        timerEndAt: 10000,
        timeLeft: 0
    };
    localStorage.setItem('sessionState', JSON.stringify(localeState));
    const initStateFromServer = jest.fn();
    const wrapper = shallow(<SessionNameTimerBlock
        initStateFromServer={initStateFromServer}
    />);
    //for avoiding inconsitency at timerEndAt
    wrapper.instance().onTickHandler();
    expect(wrapper.state().timeLeft).toBe(-1000);
});


// test('renders SessionNameTimerBlock correctly if timer is stopped', () => {
//     const wrapper = shallow(<SessionNameTimerBlock/>);
//     expect(wrapper).toMatchSnapshot();
// });
//
// describe('startPauseClickHandler should execute correctly', () => {
//     const wrapper = shallow(<SessionNameTimerBlock/>);
//
//     test('startPauseClickHandler should start timer', () => {
//         wrapper.instance().startPauseClickHandler();
//         expect(wrapper.state('timerStarted')).toBe(true);
//     });
//
//     test('startPauseClickHandler should pause timer', () => {
//         //pause timer
//         wrapper.instance().startPauseClickHandler();
//         expect(wrapper.state('timerStarted')).toBe(true);
//         expect(wrapper.state('timerPaused')).toBe(true);
//     });
//
//     test('startPauseClickHandler should resume timer', () => {
//         //resume timer
//         wrapper.instance().startPauseClickHandler();
//         expect(wrapper.state('timerStarted')).toBe(true);
//         expect(wrapper.state('timerPaused')).toBe(false);
//     });
// });
//
// test('onStopHandler should stop timer', () => {
//     const duration = 5000;
//     const wrapper = shallow(<SessionNameTimerBlock defaultTimerDuration={duration}/>);
//     wrapper.instance().onStopHandler();
//     expect(wrapper.state('timerStarted')).toBe(false);
//     expect(wrapper.state('timerPaused')).toBe(false);
//     expect(wrapper.state('timerDuration')).toBe(duration);
//     expect(wrapper.state('timePassed')).toBe(0);
// });
//
// test('onTickHandler should increase timePassed', () => {
//     const wrapper = shallow(<SessionNameTimerBlock/>);
//     wrapper.instance().onTickHandler();
//     expect(wrapper.state('timePassed')).toBeGreaterThan(0);
// });
//
// describe('componentDidMount should execute correctly', () => {
//     beforeEach(() => {
//         localStorage.clear();
//     });
//
//     test('should resume started timer', () => {
//         const endTime = 5000000 + new Date().valueOf();
//         localStorage.setItem('timerStarted', 'true');
//         localStorage.setItem('timerPaused', 'false');
//         localStorage.setItem('timerEnd', JSON.stringify(endTime));
//         const wrapper = shallow(<SessionNameTimerBlock/>);
//         expect(wrapper.state('timerStarted')).toBe(true);
//         expect(wrapper.state('timerPaused')).toBe(false);
//     });
//
//     test('should resume paused timer', () => {
//         const endTime = 5000000 + new Date().valueOf();
//         localStorage.setItem('timerStarted', 'true');
//         localStorage.setItem('timerPaused', 'true');
//         localStorage.setItem('timerEnd', JSON.stringify(endTime));
//         localStorage.setItem('timerPausedAt', JSON.stringify(new Date().valueOf()));
//         const wrapper = shallow(<SessionNameTimerBlock/>);
//         expect(wrapper.state('timerStarted')).toBe(true);
//         expect(wrapper.state('timerPaused')).toBe(true);
//     });
//
//     test('should not start timer if no more time left', () => {
//         const endTime = -5000000 + new Date().valueOf();
//         localStorage.setItem('timerStarted', 'true');
//         localStorage.setItem('timerPaused', 'false');
//         localStorage.setItem('timerEnd', JSON.stringify(endTime));
//         const wrapper = shallow(<SessionNameTimerBlock/>);
//         expect(wrapper.state('timerStarted')).toBe(false);
//         expect(wrapper.state('timerPaused')).toBe(false);
//     });
//
// });

