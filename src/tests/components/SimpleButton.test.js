import React from 'react';
import {shallow} from 'enzyme';
import SimpleButton from '../../components/buttons/SimpleButton';

test('renders SimpleButton with text', () => {
    const wrapper = shallow(<SimpleButton text="text"/>);
    expect(wrapper).toMatchSnapshot();
});

test('renders SimpleButton with text passed as prop', () => {
    const wrapper = shallow(<SimpleButton text="text"/>);
    expect(wrapper.text()).toBe('text');
});

test('should call onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<SimpleButton onClick={onClick}/>);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
});