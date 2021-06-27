import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { countryActions } from "../store/country";
const ApexChart = () => {
  const [chartData, setChartData] = useState([
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
  ]);
  const [chartOption, setChartOption] = useState({
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
  });
  
  const countryData = useSelector((state) => state.country.rows);

  const [barChartCountry,setBarChartCountry]  = useState('')
  const [lineChartCountry, setLineChartCountry] = useState('')

  const [labels, setLabels] = useState([]);

  const [barChartYears, setBarChartYears] = useState([]);
  const [lineChartYears, setLineChartYears] = useState([]);

  const [selectedBarChartYear, setSelectedBarChartYear] = useState([]);
  const [selectedLineChartYear, setSelectedLineChartYear] = useState([]);

  const [barChartValues, setBarChartValues] = useState([]);
  const [lineChartValues, setLineChartValues] = useState([]);
  const countryDropdownValues = useSelector(
    (state) => state.country.countryList
  );

  const barChartCountryHandler = (e) => {
    console.log(e.target.value);
  };
  const lineChartCountryHandler = (e) => {
    console.log(e.target.value);

  };
  const barChartYearHandler = (e) => {
    console.log(e.target.value);
  };
  const lineChartYearHandler = (e) => {
    console.log(e.target.value);

  };

  useEffect(() => {
    if (countryData.length === 0) return null;


    // const yearsForCountry = [];
    // countryData.forEach((el) => yearsForCountry.push(el.Year));
    // setBarChartYears(yearsForCountry);
    // setLineChartYears(yearsForCountry)

    // const found = countryData.find((el) => el.Year === parseInt(selectedBarChartYear));
    // const founded = { ...found };
    // delete founded.id;
    // delete founded.country;
    // delete founded.Year;
    // const properties = Object.keys(founded);
    // setLabels(properties);
    // setChartOption({
    //   ...chartOption,
    //   xaxis: { ...chartOption.xaxis, categories: properties },
    // });
    // let values = Object.values(founded);
    // setBarChartValues(values);
    // let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    // setChartData([{ data: roundedValues }]);
  }, []);

  return (
    <div id="chart" style={{ color: "red" }}>
    <div>
    <select
        id="dropdown"
        value={barChartCountry}
        onChange={barChartCountryHandler}
      >
        {countryDropdownValues.map((el) => {
          return (
            <option key={el.id} value={el.country}>
              {el.country}
            </option>
          );
        })}
      </select>
      <select
        id="dropdown"
        value={lineChartCountry}
        onChange={lineChartCountryHandler}
      >
        {countryDropdownValues.map((el) => {
          return (
            <option key={el.id} value={el.country}>
              {el.country}
            </option>
          );
        })}
      </select>
    </div>
    <div>
    <select
        id="dropdown"
        value={selectedBarChartYear}
        onChange={barChartYearHandler}
      >
        {barChartYears.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>
      <select
        id="dropdown"
        value={selectedLineChartYear}
        onChange={lineChartYearHandler}
      >
        {lineChartYears.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
    
      <ReactApexChart
        options={chartOption}
        series={chartData}
        type="line"
        height={350}
      />
    </div>
  );
};
export default ApexChart;