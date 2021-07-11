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
  
  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  componentDidMount() {
    const minY1 = Math.round(this.getMinOfArray(this.props.yDataLeft) - 1);
    const maxY1 = Math.round(this.getMaxOfArray(this.props.yDataLeft) + 1);

    const minY2 = Math.round(this.getMinOfArray(this.props.yDataRight) - 1);
    const maxY2 = Math.round(this.getMaxOfArray(this.props.yDataRight) + 1);

    this.setState({
      options : {
        color: '#FFF',
        elements : {
          point: { radius: 0 }
        },
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            min: minY1,
            max: maxY1,
          ticks: {
            display: true,
            stepSize: 0.5,
            color: 'rgba(255, 255, 255, 0.7)',
          }
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            min: minY2,
            max: maxY2,
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
            label: this.props.labelLeft,
            data: this.props.yDataLeft,
            fill: false,
            backgroundColor: '#DFE1E1',
            borderColor: '#D8DBDC',
            color: '#FFF',
            tension: 0.1,
            yAxisID: 'y',
          },
          {
            label: this.props.labelRight,
            position: 'right',
            data: this.props.yDataRight,
            fill: false,
            backgroundColor: '#0F0',
            borderColor: '#0F0',
            tension: 0.1,
            yAxisID: 'y1',
          },
        ],
      }
    });
  }

  render() {
    return (
      <div style={{width: "100%"}}>
        {this.props.title && 
        <h1>{this.props.title}</h1>}
          <Line data={this.state.chartData} options={this.state.options} />
      </div>
    )
  }
}

export default LineChart;