import React from 'react';
import './../styles/components/DataPage.css';
import ChartBlock from "./ChartBlock";
import TotalTable from "./TotalTable";

export default class ChartPage extends React.Component {
    constructor(props) {
        super(props);

        this.sessions = [120, 60, 30, 80, 0, 0, 250, 250, 120, 60, 30, 80];
        this.hours = this.sessions.map((val) => val * 0.5);
        this.monthSessions = Array.from({length: 32}, () => Math.floor(Math.random() * 100));
        this.monthHours = Array.from({length: 32}, () => Math.floor(Math.random() * 50));
        this.labels = Array.from(this.monthHours.keys());
    }
    //
    // componentDidMount() {
    //     // imitate sessions?year=2018&month=8
    //     fetch('http://localhost:3000/sessions')
    //         .then((res) => res.json())
    //         .then((data) => {
    //
    //         });
    // }

    render() {

        return (
            <div>
                <TotalTable
                    totalSessions={1500}
                    totalHours={150}
                    aveSessions={2.3}
                    aveHours={1}
                />
                <div className="chart-block">
                    <ChartBlock
                        type="line"
                        // sesHours={this.state.daySesHours}
                        average={false}
                        maxDetail="year"
                        title="Sessions & hours per day"/>
                    <ChartBlock
                        type="bar"
                        average={false}
                        maxDetail="decade"
                        title="Sessions & hours per month"/>
                    <ChartBlock
                        type="bar"
                        average={true}
                        maxDetail="decade"
                        title="Average sessions & hours per month"/>
                </div>

            </div>
        );
    }

}