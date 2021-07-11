import { registerables } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      labels : [],
      label : null,
      xData : [],
      yData : [],
      dateData : [],
      chartData : {},
      options : {},
    }
  }

  getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  componentDidMount() {
    const minY = this.getMinOfArray(this.props.yData) - 1;
    this.setState({
      options : {
        color: '#FFF',
        elements : {
          point: { radius: 0 }
        },
        responsive: true,
        scales: {
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            min: minY,
          ticks: {
            display: true,
            stepSize: 0.5,
            color: 'rgba(255, 255, 255, 0.7)',
          }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              display: true,
              color: 'rgba(255, 255, 255, 0.7)',
            }
          }
        },
      },

      chartData : {
        labels: this.props.xData,
        color: '#FFF',
        datasets: [
          {
            label: this.props.label,
            data: this.props.yData,
            fill: false,
            backgroundColor: '#DFE1E1',
            borderColor: '#D8DBDC',
            color: '#FFF',
            tension: 0.1,
          },
        ],
      }
    });
  }

  render() {
    return (
      <div style={{width: "100%"}}>
        {this.props.title && 
        <h2>{this.props.title}</h2>}
          <Line data={this.state.chartData} options={this.state.options} />
      </div>
    )
  }
}

export default LineChart;