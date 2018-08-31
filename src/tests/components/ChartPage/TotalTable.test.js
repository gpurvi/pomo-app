import React from 'react';
import {shallow} from 'enzyme';
import TotalTable from '../../../components/ChartPage/TotalTable';

it('should render ChartButtons', () => {
    const wrapper = shallow(<TotalTable
        totalSessions={142}
        totalHours={13}
        averageSessions={1}
        averageHours={5}
    />);
    expect(wrapper).toMatchSnapshot();
});
