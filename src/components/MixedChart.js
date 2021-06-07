import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Website Blog",
          type: "column",
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        },
        {
          name: "Social Media",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        // foreColor: "#fff",
        stroke: {
          width: [0, 4],
        },
        title: {
          text: "Title of graph",
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
          style: {
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: ["gray"],
          },
        },
        background: {
          enabled: true,
          foreColor: "#fff",
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#fff",
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "red",
            opacity: 0.45,
          },
        },
        subtitle: {
          text: "Mixed graph",
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "white",
          },
        },
        labels: [
          "01 Jan 2001",
          "02 Jan 2001",
          "03 Jan 2001",
          "04 Jan 2001",
          "05 Jan 2001",
          "06 Jan 2001",
          "07 Jan 2001",
          "08 Jan 2001",
          "09 Jan 2001",
          "10 Jan 2001",
          "11 Jan 2001",
          "12 Jan 2001",
        ],
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "white",
            },
          },
        },
        yaxis: [
          {
            labels: {
              style: {
                colors: "white",
              },
            },
            title: {
              text: "Website Blog",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: undefined,
                color: "white",
              },
            },
          },
          {
            opposite: true,
            title: {
              text: "Social Media",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: undefined,
                color: "white",
              },
            },
          },
        ],
        background: "#2e3f47",
        colors: ["#E91E63", "#9C27B0"],
        legend: {
          position: "bottom",
          labels: {
            colors: "white",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" style={{ color: "red" }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
export default ApexChart;
