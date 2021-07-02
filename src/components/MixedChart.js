import { CallMerge } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { countryActions } from "../store/country";
const ApexChart = () => {
  const [lineData, setLineData] = useState({
    name: "Website Blog",
    type: "column",
    data: [440, 505, 414, 671, 227, 413],
  });
  const [barData, setBarData] = useState({
    name: "Social Media",
    type: "line",
    data: [23, 42, 35, 27, 43, 39],
  });

  const [chartOption, setChartOption] = useState({
    chart: {
      type: "line",
      background: "#182B4D",
      foreColor: "#fff",
    },
    stroke: {
      width: [0, 4],
      curve: "smooth",
    },
    title: {
      text: "Title of graph",
    },
    dataLabels: {
      enabled: false,
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
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
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
    labels: [],
    xaxis: {
      type: "string",
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
    colors: ["#5E72E4", "#9C27B0"],
    legend: {
      position: "bottom",
      labels: {
        //color bottom label 
        colors: "white",
      },
    },
  });

  const countryData = useSelector((state) => state.country.rows);
  const sheetData = useSelector((state) => state.country.barChart);

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2010");

  const barChartCountryHandler = (e) => {
    setSelectedYear(e.target.value);
    const found = countryData.find(
      (el) => el.Year === parseInt(e.target.value)
    );
    const founded = { ...found };
    delete founded.id;
    delete founded.country;
    delete founded.Year;
    delete founded.Total;
    const properties = Object.keys(founded);
    let values = Object.values(founded);
    setLineData({ ...lineData, data: values });
    setChartOption({ ...chartOption, labels: properties });
  };

  useEffect(() => {
    if (countryData.length === 0) return null;
    const yearsForCountry = [];
    countryData.forEach((el) => yearsForCountry.push(el.Year));
    setYears(yearsForCountry);
    const properties = Object.keys(sheetData);
    const values = Object.values(sheetData);
    console.log("From mixed chart :", { properties }, { values });
    setBarData({ ...barData, data: values });
    setChartOption({ ...chartOption, labels: properties });
  }, [countryData.length, sheetData]);

  useEffect(() => {
    if (countryData.length === 0) return null;
    const yearsForCountry = [];
    countryData.forEach((el) => yearsForCountry.push(el.Year));
    setYears(yearsForCountry);
    const found = countryData.find((el) => el.Year === parseInt(selectedYear));
    const founded = { ...found };
    delete founded.id;
    delete founded.country;
    delete founded.Year;
    delete founded.Total;
    const properties = Object.keys(founded);
    let barChartValues = Object.values(founded);
    console.log(properties);
    setChartOption({ ...chartOption, labels: [properties] });
  }, []);

  return (
    <div id="chart">
      <div>
        <select
          id="dropdown"
          value={selectedYear}
          onChange={barChartCountryHandler}
        >
          {years.map((el) => {
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
        series={[lineData, barData]}
        type="line"
        height={500}
      />
    </div>
  );
};
export default ApexChart;
