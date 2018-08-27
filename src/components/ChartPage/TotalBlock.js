import React from 'react';
import TotalTable from "./TotalTable";

export default class TotalBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSessions: 0,
            totalHours: 0,
            averageSessions: 0,
            averageHours: 0
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState(() => ({
            totalSessions: 1522,
            totalHours: 456,
            averageSessions: 79,
            averageHours: 12
        }));
    }

    render() {
        return (
            <TotalTable {...this.state} />
        );
    }
}
