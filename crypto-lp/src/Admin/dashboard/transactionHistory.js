import React from "react";
import ethereum from "../../assets/images/ethereum.png";
import litecoin from "../../assets/images/litecoin.png";
import bitcoin from "../../assets/images/bitcoin.png";
import monero from "../../assets/images/monero.png";
import dash from "../../assets/images/dash.png";
import { t } from "i18next";

const TransactionHistory = () => {
  return (
    <>
      <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 column">
        <div className="col-bg transaction-column">
          <div className="d-flex justify-content-between">
            {/* transaction history */}
            <div>
              <h4 className="statistics-title">
                {t("text_transaction_history")}
              </h4>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-start"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("text_monthly")}
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
          <div>
            <div className="scrollable-content">
              <ul className="list-unsyled m-0 ps-0 transaction-history">
                <li className="align-items-center d-flex justify-content-between">
                  <div className="media d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={bitcoin}
                        alt="logo"
                        className="img-fluid"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="transaction align-self-center">
                      <div className="transaction-data">
                        <h5 className="m-0">Sent BTC</h5>
                        <p className="mb-0">6 June 2019 10:25 AM</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-danger">0.01245 BTC</span>
                </li>
                <li className="align-items-center d-flex justify-content-between">
                  <div className="media d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={dash}
                        alt="logo"
                        className="img-fluid"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="transaction align-self-center">
                      <div className="transaction-data">
                        <h5 className="m-0">Sent Dash</h5>
                        <p className="mb-0">6 June 2019 7:05 AM</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-success">0.03123 DASH</span>
                </li>
                <li className="align-items-center d-flex justify-content-between">
                  <div className="media d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={ethereum}
                        alt="logo"
                        className="img-fluid"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="transaction align-self-center">
                      <div className="transaction-data">
                        <h5 className="m-0">Received Ethereum</h5>
                        <p className="mb-0">5 June 2019 9:43 PM</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-danger">0.23015 ETH</span>
                </li>
                <li className="align-items-center d-flex justify-content-between">
                  <div className="media d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={litecoin}
                        alt="logo"
                        className="img-fluid"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="transaction align-self-center">
                      <div className="transaction-data">
                        <h5 className="m-0">Sent Litecoin</h5>
                        <p className="mb-0">4 June 2019 10:25 AM</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-danger">0.08632 LTC</span>
                </li>
                <li className="align-items-center d-flex justify-content-between">
                  <div className="media d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={monero}
                        alt="logo"
                        className="img-fluid"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="transaction align-self-center">
                      <div className="transaction-data">
                        <h5 className="m-0">Received Monero</h5>
                        <p className="mb-0">2 June 2019 12:35 PM</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-success">0.13692 XMR</span>
                </li>
                <li className="align-items-center d-flex justify-content-between">
                  <div className="media d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={litecoin}
                        alt="logo"
                        className="img-fluid"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="transaction align-self-center">
                      <div className="transaction-data">
                        <h5 className="m-0">Received Litecoin</h5>
                        <p className="mb-0">2 June 2019 12:35 PM</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-success">0.345678 LTC</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
