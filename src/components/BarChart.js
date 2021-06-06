import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import pptxgen from "pptxgenjs";
const ApexBarChart = () => {
  const [chartData, setChartData] = useState([
    {
      data: [430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 200],
    },
  ]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2010");
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      events: {
        animationEnd: function (chartContext, options) {
          // ...
          console.log("start");
        },
        click: function (event, chartContext, config) {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
          console.log(chartContext, event, config);
        },
      },
      //label color
      foreColor: "#373d3f",
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
      background: "#fff",
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
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
    const properties = Object.keys(founded);
    setLabels(properties);
    setChartOptions({
      ...chartOptions,
      xaxis: { ...chartOptions.xaxis, categories: properties },
    });
    let values = Object.values(found);
    setValues(values);
    let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    setChartData([{ data: roundedValues }]);
  }, [selectedTabDropdown]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    const found = countryData.find(
      (el) => el.Year === parseInt(e.target.value)
    );
    console.log("founded", found);
    const founded = { ...found };
    delete founded.id;
    delete founded.country;
    const properties = Object.keys(founded);
    setLabels(properties);
    setChartOptions({
      ...chartOptions,
      xaxis: { ...chartOptions.xaxis, categories: properties },
    });
    let values = Object.values(found);
    setValues(values);
    let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    setChartData([{ data: roundedValues }]);
  };
  const toggleAxisHandler = () => {
    setChartOptions({
      ...chartOptions,
      plotOptions: {
        ...chartOptions.plotOptions,
        bar: {
          ...chartOptions.plotOptions.bar,
          horizontal: !chartOptions.plotOptions.bar.horizontal,
        },
      },
    });
  };

  const downloadPPT = () => {
    let pptx = new pptxgen();
    let slide = pptx.addSlide();

    let dataChartRadar = [
      {
        name: `country  for year`,
        labels: ["May", "June", "July", "August", "September"],
        values: [26, 53, 100, 75, 41],
      },
    ];
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
    <div id="chart">
      <h3>
        {sheetData.name} for {selectedCountry} in {selectedYear}{" "}
      </h3>
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
        height={500}
      />
      <button onClick={toggleAxisHandler}>Toggle Axis</button>
      <button onClick={downloadPPT}>Download PPT</button>
    </div>
  );
};

export default ApexBarChart;
