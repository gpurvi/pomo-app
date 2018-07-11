import React from 'react';
import {shallow} from 'enzyme';
import StopButton from '../components/StopButton';

test('renders StopButton with grey stop image', () => {
    const wrapper = shallow(<StopButton/>);
    expect(wrapper).toMatchSnapshot();
});

test('renders StopButton with black stop image', () => {
    const wrapper = shallow(<StopButton/>);
    wrapper.setProps({timerStarted: true});
    expect(wrapper).toMatchSnapshot();
});

test('when clicked calls onStopHandler', () => {
    const wrapper = shallow(<StopButton/>);
    const onStopHandler = jest.spyOn(, 'stopCountdown');
    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
});
