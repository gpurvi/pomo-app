import React from 'react';
import '../../styles/components/DataPage.css';
import ChartBlock from "./ChartBlock";
import TotalBlock from "./TotalBlock";

export default class ChartPage extends React.Component {

    render() {
        return (
            <div>
                <TotalBlock/>
                <div className="chart-block">
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
    }

}