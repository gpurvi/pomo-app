import React from 'react';
import {shallow} from 'enzyme';
import DataRow from '../../components/TimerPage/DataRow';

test('renders DataRow correctly', () => {
    const wrapper = shallow(<DataRow firstCol="name" secondCol="age"/>);
    expect(wrapper).toMatchSnapshot();
});
