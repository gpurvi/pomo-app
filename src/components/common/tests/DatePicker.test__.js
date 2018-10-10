import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import DatePicker from '../DatePickerV1';

describe('renders correctly', () => {
    it('renders without today button', () => {
        const wrapper = shallow(<DatePicker/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with today button', () => {
        const wrapper = shallow(<DatePicker today={true}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('componentDidUpdate', () => {
    it('set state when date is not valid', () => {
        const wrapper = shallow(<DatePicker date={new Date()}/>);
        wrapper.setProps({date: null});
        expect(wrapper.state('prevDisabled')).toBeTruthy();
        expect(wrapper.state('nextDisabled')).toBeTruthy();
        expect(wrapper.state('todayDisabled')).toBeFalsy();
    });

    it('calls this.buttonDisabler when date is valid', () => {
        const buttonDisabler = jest.spyOn(DatePicker.prototype, 'buttonDisabler');
        const wrapper = shallow(<DatePicker date={null}/>);
        wrapper.setProps({date: new Date()});
        expect(buttonDisabler).toHaveBeenCalled();
    });
});

describe('buttonDisabler', () => {

    describe('nextDisabled state', () => {
        it('sets nextDisabled to true', () => {
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                maxDate={new Date(2018, 2)}
                date={new Date(2018, 1)}
            />);
            wrapper.setProps({date: new Date(2018, 2)});
            expect(wrapper.state('nextDisabled')).toBeTruthy();
        });

        it('sets nextDisabled to false', () => {
            const wrapper = shallow(<DatePicker
                maxDetail='month'
                maxDate={new Date(2018, 2)}
                date={new Date(2018, 2)}
            />);
            wrapper.setProps({date: new Date(2018, 1)});
            expect(wrapper.state('nextDisabled')).toBeFalsy();
        });
    });

    describe('prevDisabled state', () => {
        it('sets prevDisabled to true', () => {
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                minDate={new Date(2018, 1)}
                date={new Date(2018, 2)}
            />);
            wrapper.setProps({date: new Date(2018, 1)});
            expect(wrapper.state('prevDisabled')).toBeTruthy();
        });

        it('sets prevDisabled to false', () => {
            const wrapper = shallow(<DatePicker
                maxDetail='month'
                minDate={new Date(2018, 2)}
                date={new Date(2018, 2)}
            />);
            wrapper.setProps({date: new Date(2018, 3)});
            expect(wrapper.state('prevDisabled')).toBeFalsy();
        });
    });

    describe('todayDisabled state', () => {
        it('sets todayDisabled to true', () => {
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                date={new Date(2018, 2)}
            />);
            // set date to 0, because moment mock returns at timestamp 0
            wrapper.setProps({date: new Date(0)});
            expect(wrapper.state('todayDisabled')).toBeTruthy();
        });

        it('sets todayDisabled to false', () => {
            const wrapper = shallow(<DatePicker
                maxDetail='month'
                date={new Date(0)}
            />);
            wrapper.setProps({date: new Date(2018, 3)});
            expect(wrapper.state('todayDisabled')).toBeFalsy();
        });
    });
});

describe('onDateChange', () => {
    describe('data is new Date() or null', () => {
        it('calls this.props.onDateChange when data === new Date()', () => {
            const onDateChange = jest.fn();
            const date = new Date();
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                date={date}
                onDateChange={onDateChange}
            />);
            wrapper.find('DatePicker').simulate('change', date);
            expect(onDateChange).toHaveBeenCalledWith(date);
        });

        it('calls this.props.onDateChange when data === null', () => {
            const onDateChange = jest.fn();
            const date = new Date();
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                date={date}
                onDateChange={onDateChange}
            />);
            wrapper.find('DatePicker').simulate('change', date);
            expect(onDateChange).toHaveBeenCalledWith(date);
        });
    });

    describe('when button clicked', () => {
        it('prev button', () => {
            const onDateChange = jest.fn();
            const date = new Date();
            const e = {target: {dataset: {attr: 'prev'}}};
            // year because maxDetail is decade
            const calledDate = moment(date).subtract(1, 'year').toDate();
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                date={date}
                onDateChange={onDateChange}
            />);
            wrapper.find('SimpleButton').first().simulate('click', e);
            expect(onDateChange).toHaveBeenCalledWith(calledDate);
        });

        it('next button', () => {
            const onDateChange = jest.fn();
            const date = new Date();
            const e = {target: {dataset: {attr: 'next'}}};
            // year because maxDetail is decade
            const calledDate = moment(date).add(1, 'year').toDate();
            const wrapper = shallow(<DatePicker
                maxDetail='decade'
                date={date}
                onDateChange={onDateChange}
            />);
            wrapper.find('SimpleButton').at(1).simulate('click', e);
            expect(onDateChange).toHaveBeenCalledWith(calledDate);
        });

        it('next button', () => {
            const onDateChange = jest.fn();
            const date = new Date(0); // new Date(0) because moment mock is at 0
            const e = {target: {dataset: {attr: 'today'}}};
            // year because maxDetail is decade
            const wrapper = shallow(<DatePicker
                today={true}
                maxDetail='decade'
                date={date}
                onDateChange={onDateChange}
            />);
            wrapper.find('SimpleButton').last().simulate('click', e);
            expect(onDateChange).toHaveBeenCalledWith(date);
        });
    });
});

describe('getTimePeriod', () => {
    it('returns day', () => {
        const wrapper = shallow(<DatePicker
            maxDetail='month'
        />);
        expect(wrapper.instance().getTimePeriod()).toBe('day');
    });

    it('returns month', () => {
        const wrapper = shallow(<DatePicker
            maxDetail='year'
        />);
        expect(wrapper.instance().getTimePeriod()).toBe('month');
    });

    it('returns year', () => {
        const wrapper = shallow(<DatePicker
            maxDetail='decade'
        />);
        expect(wrapper.instance().getTimePeriod()).toBe('year');
    });
});