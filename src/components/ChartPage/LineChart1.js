import React from 'react';
import Chart from '../../../node_modules/chart.js/src/chart';
import moment from 'moment';

export default class LineChart1 extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.chart = null;
        // config object for datasets
        this.datasets = [
            {
                fill: false,
                label: `sessions per day`,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            }, {
                fill: false,
                label: `hours per day`,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132, 1)',
                borderWidth: 2,
            }
        ];
    }

    componentDidUpdate(prevProps) {
        // when new data is sent in with new date(date because is easier to check)
        const prevDate = moment(prevProps.date).format('M YYYY');
        const nowDate = moment(this.props.date).format('M YYYY');
        const datasets = this.chart.data.datasets;
        if (prevDate !== nowDate) {
            // no data exists in datasets for first time when sent in
            if (datasets.length === 0) {
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
            } else {
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
            }
            // labels and update always perform
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

    componentDidMount() {
        // console.log(this.props.labels);
        const ctx = this.canvasRef.current.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
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

    render() {
        return (
            <canvas ref={this.canvasRef}/>
        );
    }

}