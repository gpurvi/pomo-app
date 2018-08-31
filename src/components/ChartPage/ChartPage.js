import React from 'react';
import moment from "moment";
import '../../styles/components/DataPage.css';
import ChartBlock from "./ChartBlock";
import TotalBlock from "./TotalBlock";

export default class ChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: moment().subtract(10, 'month').toDate(),
        };
    }

    // componentDidMount() {
    //     try {
    //
    //     } catch (err) {
    //
    //     }
    // }

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
                        minDate={this.state.minDate}
                    />
                    <ChartBlock
                        type="bar"
                        header="Sessions & hours per month"
                        sessionsLabel='Sessions per month'
                        durationsLabel='Hours per month'
                        minDate={this.state.minDate}
                    />
                    <ChartBlock
                        type="bar"
                        header="Average sessions & hours per month"
                        sessionsLabel='Average sessions per month'
                        durationsLabel='Average hours per month'
                        minDate={this.state.minDate}
                    />
                </div>

            </div>
        );
    }

}