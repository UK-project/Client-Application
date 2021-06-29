import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { countryActions } from "../store/country";

import pptxgen from "pptxgenjs";
const ApexBarChart = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2010");
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      events: {
        animationEnd: function (chartContext, options) {
          // ...
          // console.log("animation end");
        },
        click: function (event, chartContext, config) {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
          // console.log(chartContext, event, config);
        },
      },
      colors: ["#5E72E4", "#5E72E4", "#5E72E4"],
      //label color
      foreColor: "white",
      //   dropShadow: {
      //     enabled: true,
      //     enabledOnSeries: undefined,
      //     top: 0,
      //     left: 0,
      //     blur: 3,
      //     color: '#111',
      //     opacity: 0.35
      // },
      brush: {
        enabled: false,
        target: undefined,
        autoScaleYaxis: true,
      },
      //background color for chart
      background: "#182B4D",
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 50,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    // values inside bar
    dataLabels: {
      style: {
        colors: ["white"],
      },
    },
    markers: {
      colors: ["#9C27B0"],
    },
    fill: {
      type: "gradient",
      colors: ["#9C27B0"],
      gradient: {
        shade: "dark",
        gradientToColors: ["#5E72E4","#9C27B0"],
        inverseColors: true,
        shadeIntensity: 0.7,
        opacityFrom: 0.9,
        opacityTo: 0.7,
        type: "horizontal",
        stops: [0, 95, 100],
      },
    },
    xaxis: {
      categories: [],
    },
    subtitle: {
      text: "Subtitle for graph",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#9699a2",
      },
    },
    //tooltip disabled
    tooltip: {
      enabled: true,
      enabledOnSeries: true,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: true,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        show: false,
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: false,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    //shadow properties
    // dropShadow: {
    //   enabled: true,
    //   top: 5,
    //   left: 10,
    //   blur: 3,
    //   opacity: 0.5
    // }
  });
  const selectedTabDropdown = useSelector(
    (state) => state.country.selectedCounty
  );
  const countryData = useSelector((state) => state.country.rows);
  const selectedCountry = useSelector((state) => state.country.selectedCounty);
  const sheetData = useSelector((state) => state.country.sheetData);

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
    dispatch(countryActions.changeBarChartDropdown({barChartData:{...founded}}))
    const properties = Object.keys(founded);
    setLabels(properties);
    setChartOptions({
      ...chartOptions,
      xaxis: { ...chartOptions.xaxis, categories: properties },
    });
    let values = Object.values(founded);
    setValues(values);
    let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    setChartData([{ data: roundedValues }]);
  }, [selectedTabDropdown]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    const found = countryData.find(
      (el) => el.Year === parseInt(e.target.value)
    );
    const founded = { ...found };
    delete founded.id;
    delete founded.country;
    delete founded.Year;
    delete founded.Total;
    dispatch(countryActions.changeBarChartDropdown({barChartData:{...founded}}))
    const properties = Object.keys(founded);
    setLabels(properties);
    setChartOptions({
      ...chartOptions,
      xaxis: { ...chartOptions.xaxis, categories: properties },
    });
    let values = Object.values(founded);
    setValues(values);
    let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    setChartData([{ data: roundedValues }]);
  };
  const toggleAxisHandler = () => {
    const gradientType =
      chartOptions.fill.gradient.type === "vertical"
        ? "horizontal"
        : "vertical";
    setChartOptions({
      ...chartOptions,
      plotOptions: {
        ...chartOptions.plotOptions,
        bar: {
          ...chartOptions.plotOptions.bar,
          horizontal: !chartOptions.plotOptions.bar.horizontal,
        },
      },
      fill: {
        ...chartOptions.fill,
        gradient: {
          ...chartOptions.fill.gradient,
          type: gradientType,
        },
      },
    });
  };

  const downloadPPT = () => {
    let pptx = new pptxgen();
    let slide = pptx.addSlide();

    // let dataChartRadar = [
    //   {
    //     name: `country  for year`,
    //     labels: ["May", "June", "July", "August", "September"],
    //     values: [26, 53, 100, 75, 41],
    //   },
    // ];
    //slide.addChart(pptx.ChartType.radar, dataChartRadar, { x: 0.36, y: 2.25, w: 4.0, h: 4.0, radarStyle: "standard" });

    //slide.addShape(pptx.ShapeType.rect, { x: 4.36, y: 2.36, w: 5, h: 2.5, fill: pptx.SchemeColor.background2 });

    //slide.addText("React Demo!", { x: 1, y: 1, w: "80%", h: 1, fontSize: 36, fill: "eeeeee", align: "center" });
    slide.addText(`country for year`, {
      x: 1,
      y: 0.5,
      w: "80%",
      h: 1,
      fontSize: 22,
      align: "center",
      fill: { color: "D3E3F3" },
      color: "008899",
    });

    let dataChartAreaLine = [
      {
        name: "Actual Sales",
        labels: [...labels],
        values: [...values],
      },
      //for group bar chart
      // {
      //   name: "Projected Sales",
      //   labels: [...labels],
      //   values: [...values],
      // },
    ];

    slide.addChart(pptx.ChartType.bar, dataChartAreaLine, {
      x: 1,
      y: 1,
      w: 8,
      h: 4,
    });

    slide.addText(`by optimum AI`, {
      x: 0,
      y: 5.3,
      w: "100%",
      h: 0.33,
      fontSize: 10,
      align: "center",
      fill: "E1E1E1", //{ color: pptx.SchemeColor.background2 },
      color: "A1A1A1", // pptx.SchemeColor.accent3,
    });

    pptx.writeFile({ fileName: `country for year.pptx` });
  };
  return (
    <div id="chart" style={{ color: "#000" }}>
      <div style={{ color: "#fff" }}>
        <h3>
          {sheetData.name} for {selectedCountry} in {selectedYear}{" "}
        </h3>
      </div>

      <select id="dropdown" value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={450}
      />
      <button onClick={toggleAxisHandler}>Toggle Axis</button>
      <button onClick={downloadPPT}>Download PPT</button>
    </div>
  );
};

export default ApexBarChart;
