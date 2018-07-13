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
    jest.useFakeTimers();
    const wrapper = shallow(<Timer timerStarted={true}/>);
    wrapper.setProps({timerStarted: false});
    expect(clearInterval).toHaveBeenCalled();
});

test('pauses timer', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<Timer timerStarted={true} timerPaused={false}/>);
    wrapper.setProps({timerPaused: true});
    expect(clearInterval).toHaveBeenCalled();
});

test('resumes timer', () => {
    const wrapper = shallow(<Timer timerStarted={true} timerPaused={true}/>);
    const startCountdown = jest.spyOn(Timer.prototype, 'startCountdown');
    wrapper.setProps({timerPaused: false});
    expect(startCountdown).toHaveBeenCalled();
});

describe('when timer ends calls methods', () => {
    jest.useFakeTimers();
    const onTimerEndHandler = jest.fn();
    const wrapper = shallow(<Timer
        onTimerEndHandler={onTimerEndHandler}
        timerDuration={5000}
        timerStarted={true}
        timerPaused={false}/>);
    const playSound = jest.spyOn(Timer.prototype, 'playSound');

    wrapper.setProps({timePassed: 5500});

    test('calls playSound method', () => {
        expect(playSound).toHaveBeenCalled();
    });

    test('calls clearInterval method', () => {
        expect(clearInterval).toHaveBeenCalled();
    });

    test('calls onTimerEndHandler method', () => {
        expect(onTimerEndHandler).toHaveBeenCalled();
    });
});

// test('startCountdown should start interval and call props.onTick', () => {
//     jest.useFakeTimers();
//     const onTickHandler = jest.fn();
//     const wrapper = shallow(<Timer onTick={onTickHandler} timerDuration={5000}/>);
//     wrapper.instance().startCountdown();
//     jest.runTimersToTime(1000);
//     expect(setInterval).toHaveBeenCalled();
// });
