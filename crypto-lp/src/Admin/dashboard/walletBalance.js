import React from "react";
import ReactApexChart from "react-apexcharts";
import { t } from "i18next";

const WalletBalance = () => {
  const chartData = {
    series: [42, 47, 52, 58, 65],
    chart: {
      height: 450,
    },
    labels: ["BTC", "ETH", "LTC", "XMR", "DASH"],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "left",
      fontSize: "16px",
      fontFamily: "roboto-regular",
      colors: ["#ff5c3c", "#ff6861", "#ff7976", "#ff9797", "#ffb8b8"],
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    colors: ["#ff5c3c", "#ff6861", "#ff7976", "#ff9797", "#ffb8b8"],
  };

  return (
    <>
      <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 column">
        <div className="col-bg monochrome-chart-col">
          <div className="d-flex justify-content-between">
            {/* wallet balance */}
            <div>
              <h4 className="statistics-title">{t("text_wallet_balance")}</h4>
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
          {/* polar area chart */}
          <ReactApexChart
            options={chartData}
            series={chartData.series}
            type="polarArea"
          />
        </div>
      </div>
    </>
  );
};

export default WalletBalance;
