import React from 'react';
import Chart from "./Chart";
import isDate from 'date-fns/is_date';
import format from 'date-fns/format';
import ChartButtons from "./ChartButtons";
import ChartHeader from "./ChartHeader";

export default class ChartInter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSessions: true,
            showDurations: true
        };
        this.onCheckHandler = this.onCheckHandler.bind(this);
    }

    onCheckHandler(e) {
        const value = e.target.value;
        if (value === 'sessions') {
            this.setState((prevState) => ({showSessions: !prevState.showSessions}));
        } else if (value === 'hours') {
            this.setState((prevState) => ({showDurations: !prevState.showDurations}));
        }
    }


    render() {
        const type = this.props.type;
        const propsDate = this.props.date;
        let maxDetail, date;
        if (type === 'line') {
            maxDetail = 'year';
            date = isDate(propsDate) ? format(propsDate, 'M/YYYY') : '';
        } else {
            maxDetail = 'decade';
            date = isDate(propsDate) ? format(propsDate, 'YYYY') : '';
        }
        return (
            <div className='container mt-5 mb-5'>
                <div className='text-center'>
                    <ChartHeader header={this.props.header} date={date}/>
                </div>
                <div className='mt-2'>
                    <Chart
                        sessionsLabel={this.props.sessionsLabel}
                        durationsLabel={this.props.durationsLabel}
                        type={this.props.type}
                        fetchedDate={this.props.fetchedDate}
                        sessions={this.props.sessions}
                        labels={this.props.labels}
                        durations={this.props.durations}
                        showSessions={this.state.showSessions}
                        showDurations={this.state.showDurations}
                    />
                </div>
                <ChartButtons
                    maxDetail={maxDetail}
                    minDate={this.props.minDate}
                    showSessions={this.state.showSessions}
                    showDurations={this.state.showDurations}
                    date={this.props.date}
                    onDateChange={this.props.onDateChange}
                    onCheck={this.onCheckHandler}
                />
            </div>
        );
    }

}
