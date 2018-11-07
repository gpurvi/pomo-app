import React from 'react';
import TotalTable from "./TotalTable";
import {getTotal} from "../common/apiCalls";

export default class TotalBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSessions: 0,
            totalHours: 0,
            averageSessions: 0,
            averageHours: 0,
            error: '',
            loading: false
        };
    }

    async componentDidMount() {
        this.setState(() => ({loading: true}));
        try {
            const total = await getTotal();
            this.setState(() => ({
                ...total,
                loading: false
            }));
        } catch (err) {
            this.setState(() => ({error: err.message}));
        }
    }

    render() {
        return (
            <TotalTable {...this.state} />
        );
    }
}
