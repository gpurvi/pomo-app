import React from 'react';
import {shallow} from 'enzyme';
import StartPauseButton from '../../components/buttons/StartPauseButton';

test('renders StartPauseButton with play image', () => {
    const wrapper = shallow(<StartPauseButton timerRunning={false}/>);
    expect(wrapper).toMatchSnapshot();
});

test('renders StopButton with pause image', () => {
    const wrapper = shallow(<StartPauseButton timerRunning={true}/>);
    expect(wrapper).toMatchSnapshot();
});

test('when clicked calls startPauseClickHandler', () => {
    const startPauseClickHandler = jest.fn();
    const wrapper = shallow(<StartPauseButton startPauseClickHandler={startPauseClickHandler}/>);
    wrapper.simulate('click');
    expect(startPauseClickHandler).toHaveBeenCalled();
});
