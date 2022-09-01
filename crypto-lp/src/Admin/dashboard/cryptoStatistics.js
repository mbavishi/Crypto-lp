import React from "react";
import ReactApexChart from "react-apexcharts";
import { t } from "i18next";

const CryptoStatistics = () => {
  const chartData = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: ["#ff5c3c", "#ff6861", "#ff7976", "#ff9797", "#ffb8b8"],
  };

  return (
    <>
      <div className="col-lg-7 col-md-12 col-sm-12 column">
        <div className="col-bg">
          <div className="d-flex justify-content-between navtab-block">
            <div>
              <h4 className="statistics-title">
                {t("text_crypto_statistics")}
              </h4>
            </div>
            <ul className="nav nav-tabs tabview" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tabs-1"
                  role="tab"
                >
                  BTC
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-2"
                  role="tab"
                >
                  ETH
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-3"
                  role="tab"
                >
                  LTC
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-3"
                  role="tab"
                >
                  XMR
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-3"
                  role="tab"
                >
                  DASH
                </a>
              </li>
            </ul>
            {/* <!-- Tab panes -->
          <!-- <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              <p>First Panel</p>
            </div>
            <div className="tab-pane" id="tabs-2" role="tabpanel">
              <p>Second Panel</p>
            </div>
            <div className="tab-pane" id="tabs-3" role="tabpanel">
              <p>Third Panel</p>
            </div>
          </div> --> */}
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
            type="area"
          />
        </div>
      </div>
    </>
  );
};

export default CryptoStatistics;
