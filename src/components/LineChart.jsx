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
              hovertemplate: ' %{y:.1f}&deg;C',
            },
            {
              x: this.props.xData,
              y: this.props.yDataRight,
              yaxis: "y2",
              name: "Humidity",
              mode: 'lines',
              hovertemplate: ' %{y:.0f}%',
            },
          ]}
          layout={{
            margin: {
              t: 90,
              b: 90,
              l: 70,
              r: 70,
              pad: 10
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
              autorange: "false",
              type: 'date',
            //   tickformatstops: [
            //   {
            //     // 0 - 1 Minute
            //     "dtickrange": [null, 60 * 1000],
            //     "value": "%H:%M:%S s"
            //   },
            //   {
            //     // 1 Minute - 1 Hour
            //     "dtickrange": [60 * 1000, 60 * 60 * 1000],
            //     "value": "%H:%M:%S"
            //   },
            //   {
            //     // 1 Hour - 1 Day
            //     "dtickrange": [60 * 60 * 1000, 23 * 60 * 60 * 1000],
            //     "value": "%H:%M"
            //   },
            //   {
            //     // 1 Day - 1 Week
            //     "dtickrange": [24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000],
            //     "value": "%d-%m-%Y"
            //   },
            //   {
            //     "dtickrange": [604800000, "M1"],
            //     "value": "%e. %b w"
            //   },
            //   {
            //     "dtickrange": ["M1", "M12"],
            //     "value": "%b '%y M"
            //   },
            //   {
            //     "dtickrange": ["M12", null],
            //     "value": "%Y Y"
            //   }
            // ]
            },
            yaxis: { title: 'Temperature (&deg;C)', automargin: true },
            yaxis2: {
              title: 'Humidity (%)', 
              range: [0, 100],
              overlaying: 'y',
              side: 'right',
              automargin: true,
            },
            hovermode: "x unified",
          }}
        />
      </div>
    )
  }
}

export default LineChart;