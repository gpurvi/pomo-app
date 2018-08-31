import React from 'react';
import {shallow} from 'enzyme';
import ChartButtons from '../../../components/ChartPage/ChartButtons';

it('should render ChartButtons', () => {
    const wrapper = shallow(<ChartButtons/>);
    expect(wrapper).toMatchSnapshot();
});

it('should call props.onCheck on sessions input', () => {
    const onCheck = jest.fn();
    const wrapper = shallow(<ChartButtons onCheck={onCheck}/>);
    wrapper.find('input').first().simulate('change');
    expect(onCheck).toHaveBeenCalled();
});

it('should call props.onCheck on hours input', () => {
    const onCheck = jest.fn();
    const wrapper = shallow(<ChartButtons onCheck={onCheck}/>);
    wrapper.find('input').last().simulate('change');
    expect(onCheck).toHaveBeenCalled();
});