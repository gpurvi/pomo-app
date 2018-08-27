import React from 'react';
// import moment from 'moment';
import Chart from '../../../node_modules/chart.js/src/chart';

export default class StackedBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.data = [120, 60, 30, 80, 0, 0, 250, 250, 120, 60, 30, 80];
        this.hours = this.data.map((val) => val * 0.5);
    }

    componentDidMount() {
        const ctx = this.canvasRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'drugs',
                    data: this.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }, {
                    label: 'sex',
                    data: this.hours,
                    fill: false,
                    borderWidth: 1,
                    borderColor: 'rgb(255, 99, 132)',
                }
                ]
            },
            options: {
                // maintainAspectRatio: false,
                title: {
                    display: true,
                    text: this.props.title
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
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