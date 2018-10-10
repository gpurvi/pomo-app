import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import DatePicker from './DatePicker';

test('renders DatePicker correctly', () => {
    const wrapper = shallow(<DatePicker date={moment()}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call onDateChange', () => {
    const onDateChange = jest.fn();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange} date={moment()}/>);
    wrapper.instance().onDateChangeHandler();
    expect(onDateChange).toHaveBeenCalled();
});

test('should call onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<DatePicker onClick={onClick} date={moment()}/>);
    wrapper.find('SimpleButton').first().simulate('click', {target: {dataset: {attr: 'prev'}}});
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith('prev');
});

