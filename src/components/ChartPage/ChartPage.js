import React from 'react';
import '../../styles/utils.css';
import ChartBlock from "./ChartBlock";
import TotalBlock from "./TotalBlock";

const ChartPage = () => (
    <div className='mt-7'>
        <TotalBlock/>

        <div className='mt-2 container'>
            <hr className='border-primary'/>
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

    </div>
);

export default ChartPage;