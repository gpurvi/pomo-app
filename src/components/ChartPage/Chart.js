import React from 'react';
import Chartjs from '../../../node_modules/chart.js/src/chart';
import isSameDate from '../../utils/isSameDate';
import isValid from 'date-fns/is_valid';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.chart = null;

        // config object for datasets
        this.datasets = [
            {
                fill: this.props.type !== 'line',
                label: this.props.sessionsLabel,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            }, {
                fill: this.props.type !== 'line',
                label: this.props.durationsLabel,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132, 1)',
                borderWidth: 2,
            }
        ];

    }

    componentDidMount() {
        // console.log(this.props.labels);
        const ctx = this.canvasRef.current.getContext('2d');
        this.chart = new Chartjs(ctx, {
            type: this.props.type,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    componentDidUpdate(prevProps) {
        const datasets = this.chart.data.datasets;
        let prevDate, nowDate;
        nowDate = this.props.fetchedDate;
        prevDate = prevProps.fetchedDate;

        // when initial fetch is done check prevProps for null, because initial is null
        if ((prevDate === null) && isValid(nowDate)) {
            if (this.props.showSessions) {
                datasets.push(this.datasets[0]);
                datasets[0].data = this.props.sessions;
            }
            if (this.props.showDurations) {
                datasets.push(this.datasets[1]);
                // if durations is only data to show to push data in right array
                if (datasets.length === 1) {
                    datasets[0].data = this.props.durations;
                } else {
                    datasets[1].data = this.props.durations;
                }
            }
            this.chart.data.labels = this.props.labels;
            this.chart.update();
            // on subsequent check fetchDate eqaulity
        } else if ((prevDate !== null) && !isSameDate(nowDate)) {
            if (this.props.showSessions) {
                datasets[0].data = this.props.sessions;
            }
            if (this.props.showDurations) {
                // if durations is only data to show to push data in right array
                if (datasets.length === 1) {
                    datasets[0].data = this.props.durations;
                } else {
                    datasets[1].data = this.props.durations;
                }
            }
            this.chart.data.labels = this.props.labels;
            this.chart.update();
        }


        //  toggle session visibility
        if ((prevProps.showSessions !== this.props.showSessions) && !this.props.showSessions) {
            datasets.shift();
            this.chart.update();
        } else if ((prevProps.showSessions !== this.props.showSessions) && this.props.showSessions) {
            datasets.unshift(this.datasets[0]);
            datasets[0].data = this.props.sessions;
            this.chart.update();
        }

        // toggle durations visibility
        if ((prevProps.showDurations !== this.props.showDurations) && !this.props.showDurations) {
            datasets.pop();
            this.chart.update();
        } else if ((prevProps.showDurations !== this.props.showDurations) && this.props.showDurations) {
            datasets.push(this.datasets[1]);
            if (datasets.length === 1) {
                datasets[0].data = this.props.durations;
            } else {
                datasets[1].data = this.props.durations;
            }
            this.chart.update();
        }
    }

    render() {
        return (
            <canvas ref={this.canvasRef}/>
        );
    }

}