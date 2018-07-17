import React from 'react';
import {shallow} from 'enzyme';
import SessionsTable from '../../components/SessionsTable';

const data = [
    {sessionName: "app", count: 5, timeInMillis: 0},
    {sessionName: "guru", count: 4, timeInMillis: 6000000},
    {sessionName: "zeta", count: 1, timeInMillis: 1500000},
    {sessionName: "null", count: 0, timeInMillis: 3600000 * 2},
];

test('renders SessionsTable correctly', () => {
    const wrapper = shallow(<SessionsTable sessionData={data}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should display correct totalCount', () => {
    const wrapper = shallow(<SessionsTable sessionData={data}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('10');
});

test('should display correct totalTime', () => {
    const wrapper = shallow(<SessionsTable sessionData={data}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('4 h 5 min');
});

test('should display correct time if less then hour', () => {
    const data = [
        {sessionName: "guru", count: 2, timeInMillis: 3500000}
    ];
    const wrapper = shallow(<SessionsTable sessionData={data}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('58 min');
});

test('should display correct time if whole hours', () => {
    const data = [
        {sessionName: "guru", count: 2, timeInMillis: 3600000}
    ];
    const wrapper = shallow(<SessionsTable sessionData={data}/>);
    expect(wrapper.find('tfoot td').at(1).text()).toContain('1 h');
});

