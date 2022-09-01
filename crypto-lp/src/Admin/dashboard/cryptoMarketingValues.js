import { t } from "i18next";
import React from "react";
import bitcoin from "../../assets/images/bitcoin.png";
import dash from "../../assets/images/dash.png";
import ethereum from "../../assets/images/ethereum.png";
import litecoin from "../../assets/images/litecoin.png";
import monero from "../../assets/images/monero.png";

const CryptoMarketingValues = () => {
  return (
    <>
      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 skillbar-col column">
        <div className="col-bg">
          <div className="d-flex">
            <div>
              <h4 className="statistics-title">
                {t("text_crypto_marketing_values")}
              </h4>
            </div>
          </div>
          <div className="table-responsive">
            <table id="dashboard-datatable" className="table marketing-values">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Currency</th>
                  <th>Price</th>
                  <th>Market cap</th>
                  <th>Volume (24h)</th>
                  <th>Change% (24h)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <img
                      src={bitcoin}
                      alt="logo"
                      className="img-fluid d-inline-block"
                      width="40"
                      height="40"
                    />
                    <h2 className="currencyname d-inline-block">Bitcoin</h2>
                  </td>
                  <td>$ 10513.00</td>
                  <td>$ 51,191,183,730</td>
                  <td>$ 10,133,400,000</td>
                  <td className="text-success">+0.66%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <img
                      src={dash}
                      alt="logo"
                      className="img-fluid d-inline-block"
                      width="40"
                      height="40"
                    />
                    <h2 className="currencyname d-inline-block">Dash</h2>
                  </td>
                  <td>$ 1547.67</td>
                  <td>$ 6,14,18,730</td>
                  <td>$ 40,13,40,000</td>
                  <td className="text-danger">-0.32%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <img
                      src={ethereum}
                      alt="logo"
                      className="img-fluid d-inline-block"
                      width="40"
                      height="40"
                    />
                    <h2 className="currencyname d-inline-block">Ethereum</h2>
                  </td>
                  <td>$ 10513.00</td>
                  <td>$ 51,191,183,730</td>
                  <td>$ 10,133,400,000</td>
                  <td className="text-success">+0.66%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <img
                      src={litecoin}
                      alt="logo"
                      className="img-fluid d-inline-block"
                      width="40"
                      height="40"
                    />
                    <h2 className="currencyname d-inline-block">Litecoin</h2>
                  </td>
                  <td>$ 10513.00</td>
                  <td>$ 51,191,183,730</td>
                  <td>$ 10,133,400,000</td>
                  <td className="text-success">+0.66%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <img
                      src={monero}
                      alt="logo"
                      className="img-fluid d-inline-block"
                      width="40"
                      height="40"
                    />
                    <h2 className="currencyname d-inline-block">Monero</h2>
                  </td>
                  <td>$ 10513.00</td>
                  <td>$ 51,191,183,730</td>
                  <td>$ 10,133,400,000</td>
                  <td className="text-success">+0.66%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoMarketingValues;
