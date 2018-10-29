import React from 'react';
import {shallow} from 'enzyme';
import {SessionName} from '../../../old/SessionName';

test('renders SessionName with name correctly', () => {
    const wrapper = shallow(<SessionName sessionName="name"/>);
    expect(wrapper).toMatchSnapshot();
});
