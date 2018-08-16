import React from 'react';
// import moment from 'moment';
import Chart from 'chart.js';

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.chart = null;
    }


    componentDidUpdate(prevProps) {
        if ((prevProps.sessions !== this.props.sessions) || (prevProps.duration !== this.props.duration)) {
            console.log('line chart updated');
            if (this.props.showSessions) {
                this.chart.data.datasets[0].data = this.props.sessions;
            }
            if (this.props.showDurations) {
                this.chart.data.datasets[1].data = this.props.duration;
            }
            this.chart.update();
        }

        //  toggle session visibility
        if ((prevProps.showSessions !== this.props.showSessions) && !this.props.showSessions) {
            this.chart.data.datasets[0].data = [];
            this.chart.update();
        } else if ((prevProps.showSessions !== this.props.showSessions) && this.props.showSessions) {
            this.chart.data.datasets[0].data = this.props.sessions;
            this.chart.update();
        }

        // toggle hour visibility
        if ((prevProps.showDurations !== this.props.showDurations) && !this.props.showDurations) {
            this.chart.data.datasets[1].data = [];
            this.chart.update();
        } else if ((prevProps.showDurations !== this.props.showDurations) && this.props.showDurations) {
            this.chart.data.datasets[1].data = this.props.duration;
            this.chart.update();
        }

    }


    componentDidMount() {
        const ctx = this.canvasRef.current.getContext('2d');
        const label = this.props.average ? 'Average ' : '';
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: `${label}sessions per month`,
                    data: this.props.sessions,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                }, {
                    label: `${label}hours per month`,
                    data: this.props.duration,
                    borderWidth: 2,
                    borderColor: 'rgb(255, 99, 132)',
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: this.props.title
                },
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