import React from 'react';
import {shallow} from 'enzyme';
import {withModal} from '../Modal';

it('renders correctly', () => {
    const Component = () => <div/>;
    const Modal = withModal(Component);
    const wrapper = shallow(<Modal/>);
    expect(wrapper).toMatchSnapshot();
});

it('opens modal', () => {
    const Component = () => <div/>;
    const Modal = withModal(Component);
    const wrapper = shallow(<Modal/>);
    wrapper.find('button').first().simulate('click');
    expect(wrapper.state('modalIsOpen')).toBeTruthy();
});

it('closes modal', () => {
    const Component = () => <div/>;
    const Modal = withModal(Component);
    const wrapper = shallow(<Modal/>);
    wrapper.instance().closeModal();
    expect(wrapper.state('modalIsOpen')).toBeFalsy();
});