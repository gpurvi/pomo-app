import React from 'react';
import '../../styles/utils.css';
import ChartBlock from "./ChartBlock";
import TotalBlock from "./TotalBlock";

const ChartPage = () => (
    <React.Fragment>
        <TotalBlock/>
        <div className='mt-5'>
            <ChartBlock
                type="line"
                header="Sessions & hours per day"
                sessionsLabel='Sessions per day'
                durationsLabel='Hours per day'
            />
            <ChartBlock
                type="bar"
                header="Sessions & hours per month"
                sessionsLabel='Sessions per month'
                durationsLabel='Hours per month'
            />
            <ChartBlock
                type="bar"
                header="Average sessions & hours per month"
                sessionsLabel='Average sessions per month'
                durationsLabel='Average hours per month'
            />
        </div>

    </React.Fragment>
);

export default ChartPage;