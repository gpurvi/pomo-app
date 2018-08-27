import React from 'react';
import Chart from "./Chart";
import moment from "moment";
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
        let maxDetail, date;
        if (type === 'line') {
            const momentDate = moment(this.props.date);
            maxDetail = 'year';
            date = momentDate.isValid() ? momentDate.format('M/YYYY') : '';
        } else {
            const momentDate = moment(this.props.date);
            maxDetail = 'decade';
            date = momentDate.isValid() ? momentDate.format('YYYY') : '';
        }
        return (
            <div>
                <ChartHeader header={this.props.header} date={date}/>
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
                <ChartButtons
                    maxDetail={maxDetail}
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    showSessions={this.state.showSessions}
                    showDurations={this.state.showDurations}
                    date={this.props.date}
                    onDateChange={this.props.onDateChange}
                    nextDisabled={this.props.nextDisabled}
                    prevDisabled={this.props.prevDisabled}
                    onCheck={this.onCheckHandler}
                    onDateChangeClick={this.props.onDateChangeClick}
                />
            </div>
        )
            ;
    }

}