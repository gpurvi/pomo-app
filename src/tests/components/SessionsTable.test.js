import React from 'react';
import {shallow} from 'enzyme';
import SessionsTable from '../../components/SessionsTable';
import SessionData from './mock_data/sessions';

test('renders SessionsTable correctly', () => {
    const wrapper = shallow(<SessionsTable sessionData={SessionData}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should display correct totalCount', () => {
    const wrapper = shallow(<SessionsTable sessionData={SessionData}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('10');
});

test('should display correct totalTime', () => {
    const wrapper = shallow(<SessionsTable sessionData={SessionData}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('3 h 55 min');
});

test('should display correct time if less then hour', () => {
    const sessionData = [
        {sessionName: "guru", count: 2, duration: 3500000}
    ];
    const wrapper = shallow(<SessionsTable sessionData={sessionData}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('58 min');
});

test('should display correct time if whole hours', () => {
    const sessionData = [
        {sessionName: "guru", count: 2, duration: 3600000}
    ];
    const wrapper = shallow(<SessionsTable sessionData={sessionData}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('1 h');
});

