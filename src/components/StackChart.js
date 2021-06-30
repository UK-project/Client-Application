import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ApexChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 850,
      type: "area",
      stacked: true,
      foreColor: "white",

    },
    colors: [
      "#008FFB",
      "#00E396",
      "#CED4DC",
      "#ff7411",
      "#f14",
      "#11F",
      "#8f0",
    ],
    grid: {
      show: false,
    },
    stroke: {
      width: [1, 1, 1, 1, 1, 1, 1],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["white"],
      },
    },
    labels: [
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
      "2003",
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "string",
      labels: {
        show: true,
        style: {
          colors: ["#fff"],
        },
      },
      title: {
        text: "Advertising Medium",
        style: {
          color: "#fff",
        },
      },
    },
    yaxis: {
      title: {
        text: "Adspend in US($)",
        style: {
          color: "#fff",
        },
      },
      min: 0,
    },
    axisBorder: {
      show: true,
      color: "red",
      height: 1,
      width: "100%",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "red",
      height: 6,
      offsetX: 0,
      offsetY: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " $";
          }
          return y;
        },
      },
    },
    // foreColor: "",
    background: {
      color: "#182B4D",
      enabled: true,
      foreColor: "red",
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: "red",
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
    legend: {
      position: "bottom",
      labels: {
        colors: "white",
      },
    },
  });
  const [firstStack, setFirstStack] = useState({
    name: "Cinema",
    type: "area",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  });
  const [secondStack, setSecondStack] = useState({
    name: "Digital",
    type: "area",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  });

  const [thirdStack, setThirdStack] = useState({
    name: "Magazine",
    type: "area",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  });
  const [fourthStack, setFourthStack] = useState({
    name: "Magazine",
    type: "area",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  });
  const [fifthStack, setFifthStack] = useState({
    name: "Magazine",
    type: "area",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  });
  const [sixthStack, setSixthStack] = useState({
    name: "Magazine",
    type: "area",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  });
  const [line, setLine] = useState({
    name: "TV",
    type: "area",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  });

  const countryData = useSelector((state) => state.country.rows);
  const selectedCountry = useSelector((state) => state.country.selectedCounty);
  const sheetData = useSelector((state) => state.country.sheetData);

  const [Cinema, setCinema] = useState([]);
  const [Digital, setDigital] = useState([]);
  const [Magazines, setMagazines] = useState([]);
  const [Newspapers, setNewspapers] = useState([]);
  const [OOH, setOOH] = useState([]);
  const [Radio, setRadio] = useState([]);
  const [TV, setTV] = useState([]);

  useEffect(() => {
    if (countryData.length === 0) return null;
    console.log({ countryData }, { selectedCountry }, { sheetData });
    const TVValues = [];
    const CinemaValues = [];
    const DigitalValues = [];
    const MagazinesValues = [];
    const NewspapersValues = [];
    const OOHValues = [];
    const RadioValues = [];
    const Years = [];
    countryData.forEach((row) => {
      TVValues.push(row.TV);
      CinemaValues.push(row.Cinema);
      DigitalValues.push(row.Digital);
      MagazinesValues.push(row.Magazines);
      NewspapersValues.push(row.Newspapers);
      OOHValues.push(row.OOH);
      RadioValues.push(row.Radio);
      Years.push(row.Year);
    });
    setCinema(CinemaValues);
    setDigital(DigitalValues);
    setMagazines(MagazinesValues);
    setNewspapers(NewspapersValues);
    setOOH(OOHValues);
    setRadio(RadioValues);
    setTV(TVValues);
    console.log({ firstStack });
    setChartOptions({
      ...chartOptions,
      labels: Years,
    });
    setFirstStack({ ...firstStack, data: CinemaValues });
    setSecondStack({ ...secondStack, data: DigitalValues });
    setThirdStack({ ...thirdStack, data: MagazinesValues });
    setFourthStack({ ...fourthStack, data: NewspapersValues });
    setFifthStack({ ...fifthStack, data: OOHValues });
    setSixthStack({ ...sixthStack, data: RadioValues });
    setLine({ ...line, data: TVValues });
    // countryData => TabData
  }, [countryData, selectedCountry, sheetData]);

  return (
    <div id="chart">
      <div style={{ color: "#fff" }}>
        <h3>
          {sheetData.name} for {selectedCountry} in{" "}
        </h3>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={[
          firstStack,
          secondStack,
          thirdStack,
          fourthStack,
          fifthStack,
          sixthStack,
          line,
        ]}
        type="area"
        height={650}
      />
    </div>
  );
};
export default ApexChart;
