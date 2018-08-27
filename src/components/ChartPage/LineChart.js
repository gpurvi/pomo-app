import React from 'react';
import moment from 'moment';
import Chart from '../../../node_modules/chart.js/src/chart';

export default class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.chart = null;

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
                data: this.props.duration,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132, 1)',
                borderWidth: 2,
            }
        ];
    }

    componentDidUpdate(prevProps) {

        const datasets = this.chart.data.datasets;
        // after init it is called when data arrives
        if (this.props.labels.length !== 0 && prevProps.labels.length === 0) {
            console.log(this.props.labels.length);
            // console.log('init of chart');
            console.log('start', this.props.labels.length);
            this.chart.data.labels = this.props.labels;
            if (this.props.showSessions) {
                datasets.unshift(this.datasets[0]);
                this.chart.data.datasets[0].data = this.props.sessions;
            }
            if (this.props.showDurations) {
                datasets.push(this.datasets[1]);
                if (datasets.length === 1) {
                    this.chart.data.datasets[0].data = this.props.duration;
                } else {
                    this.chart.data.datasets[1].data = this.props.duration;
                }
            }
            this.chart.update();
        }
        console.log(moment(prevProps.date).format('M YYYY'));
        // when changing date
        if (moment(prevProps.date).format('M YYYY') !== moment(this.props.date).format('M YYYY')) {
            console.log('sent in labels', this.props.labels.length);
            console.log('current date days', moment(this.props.date).daysInMonth());
            this.chart.data.labels = this.props.labels;
            if (this.props.showSessions) {
                datasets[0].data = this.props.sessions;
            }
            if (this.props.showDurations) {
                // to check if session dataset is set
                if (datasets.length === 1) {
                    datasets[0].data = this.props.duration;
                } else {
                    datasets[1].data = this.props.duration;
                }
            }
            this.chart.update();
        }

        //  toggle session visibility
        if ((prevProps.showSessions !== this.props.showSessions) && !this.props.showSessions) {
            this.props.toggleShow('sessions', false);
            datasets.shift();
            this.chart.update();
        } else if ((prevProps.showSessions !== this.props.showSessions) && this.props.showSessions) {
            this.props.toggleShow('sessions', true);
            datasets.unshift(this.datasets[0]);
            datasets[0].data = this.props.sessions;
            this.chart.update();
        }

        // toggle hour visibility
        if ((prevProps.showDurations !== this.props.showDurations) && !this.props.showDurations) {
            this.props.toggleShow('duration', false);
            datasets.pop();
            this.chart.update();
        } else if ((prevProps.showDurations !== this.props.showDurations) && this.props.showDurations) {
            this.props.toggleShow('duration', true);
            datasets.push(this.datasets[1]);
            if (datasets.length === 1) {
                datasets[0].data = this.props.duration;
            } else {
                datasets[1].data = this.props.duration;
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
                // labels: this.props.labels,
                datasets: []
            },
            options: {
                // legend: {
                //     // display: false,
                //     // onClick: function(e, legendItem) {
                //     //
                //     //     // var index = legendItem.datasetIndex;
                //     //     // var ci = this.chart;
                //     //     // var meta = ci.getDatasetMeta(index);
                //     //     //
                //     //     // // See controller.isDatasetVisible comment
                //     //     // meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
                //     //     //
                //     //     // // We hid a dataset ... rerender the chart
                //     //     // ci.update();
                //     // }
                // },
                // title: {
                //     display: true,
                //     text: this.props.title
                // },
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