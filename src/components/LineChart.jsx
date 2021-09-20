import React from 'react';
//import { Line } from 'react-chartjs-2';
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      label: null,
      xData: [],
      yData: [],
      dateData: [],
      chartData: {},
      options: {},
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
      options: {
        color: '#FFF',
        elements: {
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
    });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.props.title &&
          <h1>{this.props.title}</h1>}
        <Plot
          data={[
            {
              x: this.props.xData,
              y: this.props.yDataLeft,
              name: "Temperature",
              mode: 'lines',
              hovertemplate: ' %{y:.1f}&deg;C<br />%{x}',
            },
            {
              x: this.props.xData,
              y: this.props.yDataRight,
              yaxis: "y2",
              name: "Humidity",
              mode: 'lines',
              hovertemplate: ' %{y:.0f}%<br />%{x}',
            },
          ]}
          layout={{
            margin: {
              t: 10,
              b: 80,
              pad: 15
            },
            responsive: "true",
            autosize: true,
            legend: {
              orientation: "h",
              yanchor: "bottom",
              y: 1.12,
              xanchor: "right",
              x: 1,
            },
            xaxis: {
              title: { text: 'Date/Time' },
              type: 'time',
              tickformat: '%H:%m',
            },
            yaxis: { title: 'Temperature (&deg;C)', automargin: true },
            yaxis2: {
              title: 'Humidity (%)', 
              titlefont: { color: 'rgb(148, 103, 189)' },
              tickfont: { color: 'rgb(148, 103, 189)' },
              range: [0, 100],
              overlaying: 'y',
              side: 'right',
              automargin: true,
            }
          }}
        />
      </div>
    )
  }
}

export default LineChart;