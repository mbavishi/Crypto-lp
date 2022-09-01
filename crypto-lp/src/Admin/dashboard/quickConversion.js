import React from "react";
import { t } from "i18next";

const QuickConversion = () => {
  return (
    <>
      <div className="col-lg-5 col-md-12 column">
        <div className="col-bg">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="statistics-title">{t("text_quick_conversion")}</h4>
            </div>
            <a className="btn" href="#" role="button">
              <i className="fa-solid fa-rotate rotate"></i>
            </a>
          </div>
          <div className="position-relative dashboard-apu-rate text-center">
            <h3>APU Rate</h3>
            <h2>$0.4484</h2>
            <div className="row justify-content-center">
              <div className="col-lg-5 rate-option">
                <input
                  type="text"
                  id="wallet-coin-input1"
                  name="wallet-coin-input"
                  value="0.1"
                  className="form-control text-center theme-input"
                  required
                />
                <select
                  name="wallet"
                  id="wallet-coin"
                  className="form-select theme-select-icon custom-select"
                  aria-label="Default select example"
                >
                  <option value="BNB">BNB</option>
                  <option value="BUSD">BUSD BEP20</option>
                  <option value="TRX">TRX</option>
                  <option value="USDT">USDT TRC20</option>
                  <option value="APU">APU</option>
                </select>
              </div>
              <div className="col-lg-2 rate-calculator">
                <i className="fa-solid fa-equals"></i>
              </div>
              <div className="col-lg-5 rate-option">
                <input
                  type="text"
                  id="wallet-coin-input2"
                  name="wallet-coin-input"
                  value="0.1"
                  className="form-control text-center theme-input"
                  required
                />
                <select
                  name="wallet"
                  id="wallet-coin"
                  className="form-select theme-select-icon custom-select"
                  aria-label="Default select example"
                >
                  <option value="APU">APU</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickConversion;
