import React from 'react';
import {shallow} from 'enzyme';
import StopButton from '../../components/buttons/StopButton';

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
    const onStopHandler = jest.fn();
    const wrapper = shallow(<StopButton onStopHandler={onStopHandler}/>);
    wrapper.simulate('click');
    expect(onStopHandler).toHaveBeenCalled();
});
