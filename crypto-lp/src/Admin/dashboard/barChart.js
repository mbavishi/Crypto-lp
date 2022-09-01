import React from "react";
import ReactApexChart from "react-apexcharts";
import { t } from "i18next";

const BarChart = () => {
  const chartData = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48],
      },
    ],
    chart: {
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: ["2017", "2018", "2019", "2020", "2021", "2022"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    colors: ["#ff5c3c", "#ff6861", "#ff7976", "#ff9797", "#ffb8b8"],
  };

  return (
    <>
      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 column margin-75">
        <div className="col-bg">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="statistics-title">{t("text_bar_chart")}</h4>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-start"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("text_yearly")}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    {t("text_one")}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {t("text_two")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ReactApexChart
            options={chartData}
            series={chartData.series}
            type="bar"
          />
        </div>
      </div>
    </>
  );
};

export default BarChart;
