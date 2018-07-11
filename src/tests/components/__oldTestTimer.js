// import React from 'react';
// import {shallow} from 'enzyme';
// import Timer from '../components/Timer';
//
// test('renders Timer correctly', () => {
//     const wrapper = shallow(<Timer/>);
//     expect(wrapper).toMatchSnapshot();
// });
//
// describe('startCountdown should work properly', () => {
//     jest.useFakeTimers();
//     const wrapper = shallow(<Timer/>);
//     const prevStateTimeLeft = wrapper.state('timeLeft');
//     wrapper.instance().startCountdown();
//
//     test('should change timerState object', () => {
//         expect(wrapper.instance().timerState.__timerId).not.toBeUndefined();
//     });
//
//     test('should call setInterval', () => {
//         expect(setInterval).toHaveBeenCalled();
//     });
// });
//
// describe('stopCountdown should work properly', () => {
//     jest.useFakeTimers();
//     const wrapper = shallow(<Timer/>);
//     const prevStateTimeLeft = wrapper.state('timeLeft');
//     wrapper.instance().stopCountdown();
//
//     test('should change timeLeft', () => {
//         expect(wrapper.state('timeLeft')).toBeGreaterThan(0);
//
//     });
//
//     test('should call setInterval', () => {
//         expect(clearInterval).toHaveBeenCalled();
//     });
//
// });
//
// describe('should start timer', () => {
//     const wrapper = shallow(<Timer/>);
//     const startCountdown = jest.spyOn(Timer.prototype, 'startCountdown');
//     wrapper.find('button').simulate('click');
//
//     test('should change state:started to true ', () => {
//         expect(wrapper.state('started')).toBe(true);
//     });
//
//     test('should call startCountdown method', () => {
//         expect(startCountdown).toHaveBeenCalled();
//     });
// });
//
// describe('should stop timer after time passes', () => {
//     const wrapper = shallow(<Timer/>);
//     const playSound = jest.spyOn(Timer.prototype, 'playSound');
//     const stopCountdown = jest.spyOn(Timer.prototype, 'stopCountdown');
//     // not best way - simulate end of timer
//     wrapper.setState({timeLeft: 0});
//
//     test('should call play sound', () => {
//         expect(playSound).toHaveBeenCalled();
//     });
//
//     test('should call stopCountdown', () => {
//         expect(stopCountdown).toHaveBeenCalled();
//     });
// });
//
//
// describe('should stop timer and change state: started to false when button clicked', () => {
//     jest.useFakeTimers();
//     const wrapper = shallow(<Timer/>);
//     const stopCountdown = jest.spyOn(Timer.prototype, 'stopCountdown');
//
//     wrapper.find('button').simulate('click');
//     wrapper.find('button').simulate('click');
//
//     test('should change state:started to false ', () => {
//         expect(wrapper.state('started')).toBe(false);
//     });
//
//     test('should call stopCountdown', () => {
//         expect(stopCountdown).toHaveBeenCalled();
//     });
// });