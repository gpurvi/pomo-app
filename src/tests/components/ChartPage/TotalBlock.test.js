import React from 'react';
import {shallow} from 'enzyme';
import TotalBlock from '../../../components/ChartPage/TotalBlock';

it('should render ChartButtons', () => {
    const wrapper = shallow(<TotalBlock/>);
    expect(wrapper).toMatchSnapshot();
});
