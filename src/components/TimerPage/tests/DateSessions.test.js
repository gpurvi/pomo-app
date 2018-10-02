import React from 'react';
import {shallow} from 'enzyme';
import moment from "moment/moment";
import DateSessions from '../DateSessions';

const data = [
    {sessionName: "app", count: 5, timeInMillis: 0},
    {sessionName: "guru", count: 4, timeInMillis: 6000000},
    {sessionName: "zeta", count: 1, timeInMillis: 1500000},
    {sessionName: "null", count: 0, timeInMillis: 3600000 * 2},
];
// cannot perform this test because of moment quirks
// test('renders DateSessions correctly', () => {
//     const wrapper = shallow(<DateSessions/>);
//     // wrapper.setState({date: moment()});
//     expect(wrapper).toMatchSnapshot();
// });

test('should set new date', () => {
    const wrapper = shallow(<DateSessions sessionData={data}/>);
    const now = moment();
    wrapper.instance().onDateChangeHandler(now);
    expect(wrapper.state('date')).toBe(now);
});

test('should set new date', () => {
    const wrapper = shallow(<DateSessions sessionData={data}/>);
    const now = moment();
    wrapper.instance().onDateChangeHandler(now);
    expect(wrapper.state('date')).toBe(now);
});

describe('onClickHandler should', () => {
    const wrapper = shallow(<DateSessions sessionData={data}/>);

    test('set state if action = prev', () => {
        wrapper.instance().onClickHandler('prev');
        expect(wrapper.state('buttonClick')).toBe(true);
    });

    test('set state if action = next', () => {
        wrapper.instance().onClickHandler('next');
        expect(wrapper.state('buttonClick')).toBe(true);
    });

    //cannot perform this test because of moment quirks
    // test('set state if action = now', () => {
    //     wrapper.instance().onClickHandler('now');
    //     const now = moment();
    //     expect(wrapper.state('date')).toEqual(now);
    // });
});

describe('componentDidUpdate should', () => {
    const onDateChange = jest.fn();
    const wrapper = shallow(<DateSessions
        sessionData={data}
        onDateChange={onDateChange}
    />);

    test('set state if prevState.date === state.date', () => {
        wrapper.setState({buttonClick: true});
        wrapper.setState({date: moment(1500)});
        expect(wrapper.state('buttonClick')).toBe(false);
    });

    test('set state if action = next', () => {
        wrapper.instance().onClickHandler('next');
        expect(wrapper.state('buttonClick')).toBe(true);
    });

    //cannot perform this test because of moment quirks
    // test('set state if action = now', () => {
    //     wrapper.instance().onClickHandler('now');
    //     const now = moment();
    //     expect(wrapper.state('date')).toEqual(now);
    // });
});