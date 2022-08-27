import { t } from "i18next";
import React from "react";

const QuickTrade = () => {
  return (
    <>
      <div className="col-lg-7 column skillbar-col">
        <div className="col-bg quick-col">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="statistics-title">{t("text_quick_trade")}</h4>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-start"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                375,781 BTC
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    23,511 LTC
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    23,511 LTC
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <form action="#" className="mt-0 needs-validation">
              <div className="d-flex">
                <div className="d-inline-block col-md-6 spacing amount">
                  <div className="input_box quick-trade-input">
                    <input
                      type="input"
                      className="form-control theme-input"
                      placeholder="Amount BTC"
                      aria-label="Amount BTC"
                      aria-describedby="Amount BTC"
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a input.
                    </div>
                  </div>
                  <div className="input_box quick-trade-input">
                    <input
                      type="input"
                      className="form-control theme-input"
                      placeholder="Fee (1%)"
                      aria-label="Fee (1%)"
                      aria-describedby="Fee (1%)"
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a input.
                    </div>
                  </div>
                </div>
                <div className="d-inline-block quick-input col-md-6 spacing price">
                  <div className="input_box quick-trade-input">
                    <input
                      type="input"
                      className="form-control theme-input"
                      placeholder="Price BPL"
                      aria-label="Price BPL"
                      aria-describedby="Price BPL"
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a input.
                    </div>
                  </div>
                  <div className="input_box quick-trade-input">
                    <input
                      type="input"
                      className="form-control theme-input"
                      placeholder="Total BPL"
                      aria-label="Total BPL"
                      aria-describedby="Total BPL"
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a input.
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center dashboard-main-btn">
                <button className="btn btn-primary buy-btn mx-2" type="submit">
                  {t("btn_buy")}
                </button>
                <button className="btn btn-primary sell-btn mx-2" type="submit">
                  {t("btn_sell")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickTrade;
