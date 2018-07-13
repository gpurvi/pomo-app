import React from 'react';
import {shallow} from 'enzyme';
import SessionNameTimerBlock from '../../components/SessionNameTimerBlock';

test('renders SessionNameTimerBlock correctly if timer is started', () => {
    const wrapper = shallow(<SessionNameTimerBlock/>);
    wrapper.instance().startPauseClickHandler();
    expect(wrapper).toMatchSnapshot();
});

test('renders SessionNameTimerBlock correctly if timer is stopped', () => {
    const wrapper = shallow(<SessionNameTimerBlock/>);
    expect(wrapper).toMatchSnapshot();
});

describe('startPauseClickHandler should execute correctly', () => {
    const wrapper = shallow(<SessionNameTimerBlock/>);

    test('startPauseClickHandler should start timer', () => {
        wrapper.instance().startPauseClickHandler();
        expect(wrapper.state('timerStarted')).toBe(true);
    });

    test('startPauseClickHandler should pause timer', () => {
        //pause timer
        wrapper.instance().startPauseClickHandler();
        expect(wrapper.state('timerStarted')).toBe(true);
        expect(wrapper.state('timerPaused')).toBe(true);
    });

    test('startPauseClickHandler should resume timer', () => {
        //resume timer
        wrapper.instance().startPauseClickHandler();
        expect(wrapper.state('timerStarted')).toBe(true);
        expect(wrapper.state('timerPaused')).toBe(false);
    });
});

test('onStopHandler should stop timer', () => {
    const duration = 5000;
    const wrapper = shallow(<SessionNameTimerBlock defaultTimerDuration={duration}/>);
    wrapper.instance().onStopHandler();
    expect(wrapper.state('timerStarted')).toBe(false);
    expect(wrapper.state('timerPaused')).toBe(false);
    expect(wrapper.state('timerDuration')).toBe(duration);
    expect(wrapper.state('timePassed')).toBe(0);
});

test('onTickHandler should increase timePassed', () => {
    const wrapper = shallow(<SessionNameTimerBlock/>);
    wrapper.instance().onTickHandler();
    expect(wrapper.state('timePassed')).toBeGreaterThan(0);
});

describe('componentDidMount should execute correctly', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should resume started timer', () => {
        const endTime = 5000000 + new Date().valueOf();
        localStorage.setItem('timerStarted', 'true');
        localStorage.setItem('timerPaused', 'false');
        localStorage.setItem('timerEnd', JSON.stringify(endTime));
        const wrapper = shallow(<SessionNameTimerBlock/>);
        expect(wrapper.state('timerStarted')).toBe(true);
        expect(wrapper.state('timerPaused')).toBe(false);
    });

    test('should resume paused timer', () => {
        const endTime = 5000000 + new Date().valueOf();
        localStorage.setItem('timerStarted', 'true');
        localStorage.setItem('timerPaused', 'true');
        localStorage.setItem('timerEnd', JSON.stringify(endTime));
        localStorage.setItem('timerPausedAt', JSON.stringify(new Date().valueOf()));
        const wrapper = shallow(<SessionNameTimerBlock/>);
        expect(wrapper.state('timerStarted')).toBe(true);
        expect(wrapper.state('timerPaused')).toBe(true);
    });

    test('should not start timer if no more time left', () => {
        const endTime = -5000000 + new Date().valueOf();
        localStorage.setItem('timerStarted', 'true');
        localStorage.setItem('timerPaused', 'false');
        localStorage.setItem('timerEnd', JSON.stringify(endTime));
        const wrapper = shallow(<SessionNameTimerBlock/>);
        expect(wrapper.state('timerStarted')).toBe(false);
        expect(wrapper.state('timerPaused')).toBe(false);
    });

});

