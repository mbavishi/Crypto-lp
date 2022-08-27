import React from "react";
import Graph1 from "../../assets/images/graph_1.png";
import Graph2 from "../../assets/images/graph_2.png";
import Graph3 from "../../assets/images/graph_3.png";
import Graph4 from "../../assets/images/graph_4.png";
import { t } from "i18next";

const DbPart1 = () => {
  return (
    <>
      <div className="row box-row">
        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 balance-col">
          <div className="col-inner balance-card">
            <div className="card-header">
              <h2 className="box-topic">{t("text_wallet_balance")}</h2>
              <div className="d-flex">
                <i className="fa-solid fa-arrow-trend-up text-success"></i>
                <h3 className="balance">+8.76%</h3>
              </div>
              <h2 className="total-balance">$98765.00</h2>
            </div>
            <div className="card-body">
              <img
                src={Graph1}
                alt="logo"
                className="img-fluid"
                width="100%"
                height="7"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 balance-col">
          <div className="col-inner balance-card">
            <div className="card-header">
              <h2 className="box-topic">Number of trades</h2>
              <div className="d-flex">
                <i className="fa-solid fa-arrow-trend-down down-icon text-danger"></i>
                <h3 className="balance">-2.53%</h3>
              </div>
              <h2 className="total-balance">1089</h2>
            </div>
            <div className="card-body">
              <img
                src={Graph2}
                alt="logo"
                className="img-fluid"
                width="100%"
                height="7"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 balance-col">
          <div className="col-inner balance-card">
            <div className="card-header">
              <h2 className="box-topic">Invested amount</h2>
              <div className="d-flex">
                <i className="fa-solid fa-arrow-trend-up text-success"></i>
                <h3 className="balance">+8.76%</h3>
              </div>
              <h2 className="total-balance">$98765.00</h2>
            </div>
            <div className="card-body">
              <img
                src={Graph3}
                alt="logo"
                className="img-fluid"
                width="100%"
                height="7"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 balance-col">
          <div className="col-inner balance-card">
            <div className="card-header">
              <h2 className="box-topic">Total members</h2>
              <div className="d-flex">
                <i className="fa-solid fa-arrow-trend-up text-success"></i>
                <h3 className="balance">+8.76%</h3>
              </div>
              <h2 className="total-balance">743</h2>
            </div>
            <div className="card-body card-body-member">
              <img
                src={Graph4}
                alt="logo"
                className="img-fluid"
                width="100%"
                height="7"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DbPart1;
