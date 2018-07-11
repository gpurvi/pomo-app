import React from 'react';
import {shallow} from 'enzyme';
import Timer from '../../components/Timer';

test('renders Timer correctly', () => {
    const wrapper = shallow(<Timer timerDuration={5000}/>);
    expect(wrapper).toMatchSnapshot();
});

test('starts timer', () => {
    const wrapper = shallow(<Timer timerStarted={false}/>);
    const startCountdown = jest.spyOn(Timer.prototype, 'startCountdown');
    wrapper.setProps({timerStarted: true});
    expect(startCountdown).toHaveBeenCalled();
});

test('stops timer', () => {
    const wrapper = shallow(<Timer timerStarted={true}/>);
    const stopCountdown = jest.spyOn(Timer.prototype, 'stopCountdown');
    wrapper.setProps({timerStarted: false});
    expect(stopCountdown).toHaveBeenCalled();
});

test('pauses timer', () => {
    const wrapper = shallow(<Timer timerStarted={true} timerPaused={false}/>);
    const pauseCountdown = jest.spyOn(Timer.prototype, 'pauseCountdown');
    wrapper.setProps({timerPaused: true});
    expect(pauseCountdown).toHaveBeenCalled();
});

test('resumes timer', () => {
    const wrapper = shallow(<Timer timerStarted={true} timerPaused={true}/>);
    const startCountdown = jest.spyOn(Timer.prototype, 'startCountdown');
    wrapper.setProps({timerPaused: false});
    expect(startCountdown).toHaveBeenCalled();
});

describe('when timer ends calls methods', () => {
    const onTimerEndHandler = jest.fn();
    const wrapper = shallow(<Timer
        onTimerEndHandler={onTimerEndHandler}
        timerDuration={5000}
        timerStarted={true}
        timerPaused={false}/>);
    const playSound = jest.spyOn(Timer.prototype, 'playSound');
    const stopCountdown = jest.spyOn(Timer.prototype, 'stopCountdown');

    wrapper.setState({timePassed: 5500});

    test('calls playSound method', () => {
        expect(playSound).toHaveBeenCalled();
    });

    test('calls stopCountdown method', () => {
        expect(stopCountdown).toHaveBeenCalled();
    });

    test('calls onTimerEndHandler method', () => {
        expect(onTimerEndHandler).toHaveBeenCalled();
    });
});

test('startCountdown should start interval and change state', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<Timer timerDuration={5000}/>);
    wrapper.instance().startCountdown();
    jest.runTimersToTime(1000);
    expect(setInterval).toHaveBeenCalled();
    expect(wrapper.state('timePassed')).toBeGreaterThan(0);
});

test('stopCountdown should set timePassed to 0 and call clearInterval', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<Timer timerDuration={5000}/>);
    wrapper.instance().stopCountdown();
    expect(clearInterval).toHaveBeenCalled();
    expect(wrapper.state('timePassed')).toEqual(0);
});

test('pauseCountdown should set state and call clearInterval', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<Timer timerDuration={5000}/>);
    wrapper.instance().pauseCountdown();
    expect(clearInterval).toHaveBeenCalled();
});