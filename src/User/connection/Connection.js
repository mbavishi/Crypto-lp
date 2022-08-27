import { React, useState, useEffect } from "react";
import {
  userWalletConn,
  fromCurrency,
  toCurrency,
  AddTransaction,
} from "../../Redux/Action/FetchData";
import WalletConnect from "../../assets/images/walletconnect.jpeg";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MetaMask from "../../assets/images/metamask.svg";
// import { ToastContainer } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import UserTheme from "../theme/userTheme";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";
import Web3 from "web3";

const Connection = ({ dispatch, res, fromCurre, toCurre, trans }) => {
  //web3 react object
  const { deactivate } = useWeb3React();
  //handle the modal of connect wallet
  const [show, setShow] = useState(false);
  //handle  wallet address show or not
  const [display, setDisplay] = useState(false);
  //store to currenct rate
  const [rate, setRate] = useState("0.4486");
  //store connect wallet address
  const [walletAddress, setWalletAddress] = useState("");
  //store from and to currency
  const [currencyRate, setCurrencyRate] = useState({
    from: "",
    to: "",
  });
  //store transaction data
  const [transactionData, setTransactionData] = useState({
    wallet_address: "",
    from_amount: "",
    from_currency: "",
    from_rate: "",
    to_amount: "",
    to_currency: "",
    to_rate: "",
  });
  //close the modal
  const handleClose = () => setShow(false);

  //handle connection
  const handleConnection = () => {
    setShow(true);
  };
  // call api fromCurr and toCurr
  useEffect(() => {
    dispatch(fromCurrency());
    dispatch(toCurrency(1));
  }, [dispatch]);
  var fromCur = fromCurre.data;
  console.log("fromCur", fromCur);

  // const toCur =fromCurr.data
  // console.log("to",toCur);

  //check meta mask extension or not
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("no browser extension available ! check out Meta Mask");
    }
    return provider;
  };

  //connect the metamask
  const handleMetaMask = async (e) => {
    e.preventDefault();
    const provider = detectProvider();
    const data = await provider.request({
      method: "eth_requestAccounts",
    });
    //connect binance chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // chainId must be in hexadecimal numbers
    });
    if (data) {
      setShow(false);
      setDisplay(true);
      setWalletAddress(data[0]);
      setTransactionData({
        ...transactionData,
        wallet_address: data[0],
      });
      dispatch(userWalletConn(data[0]));
    }
  };

  const handleDisConnect = () => {
    deactivate();
    setDisplay(false);
  };
  //handle from currency
  const handleFromCurrency = (e) => {
    const { name, value } = e.target;
    dispatch(toCurrency(value));
  };
  const toCur = toCurre.data;

  //handle translation of currency
  const handleCurrencyRateFrom = (e) => {
    const { name, value } = e.target;

    setCurrencyRate({
      from: value,
      to: rate * value,
    });
    setTransactionData({
      ...transactionData,
      from_amount: value,
      from_currency: "BNB",
      from_rate: "0.44",
      to_amount: rate * value,
      to_currency: "APU",
      to_rate: "0.44",
    });
    console.log(rate);
  };

  //handle translation of currency
  const handleCurrencyRateTo = (e) => {
    const { name, value } = e.target;

    setCurrencyRate({
      from: rate / value,
      to: value,
    });
    setTransactionData({
      ...transactionData,
      from_amount: rate / value,
      from_currency: "BNB",
      from_rate: "0.44",
      to_amount: value,
      to_currency: "APU",
      to_rate: "0.44",
    });
  };

  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    rpc: {
      56: "https://bsc-dataseed.binance.org",
    },
    chainId: 56,
    network: "binance",
    infuraId: "1856e4b52b854fa5af28ddfd3985be11",
    bridge: "https://bridge.walletconnect.org",
  });

  //handle Wallet
  const handleWallet = async () => {
    await provider.enable();
    const web3 = new Web3(provider);
    window.w3 = web3;
    var account = await web3.eth.getAccounts();
    if (account) {
      setShow(false);
      setDisplay(true);
      setWalletAddress(account[0]);
      setTransactionData({
        ...transactionData,
        wallet_address: account[0],
      });
      dispatch(userWalletConn(account[0]));
    } else {
      setShow(true);
      setDisplay(false);
    }
  };
  const user = res.data;

  if (user.status === true) {
    sessionStorage.setItem("user_id", user.message.user_id);
  }
  //add the transaction on click of submit button
  const handleTransaction = () => {
    dispatch(AddTransaction(transactionData));
  };

  return (
    <>
      <Title props={t("text_crypto_calculator")} />
      {/* <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <Modal show={show}>
        <Modal.Body className="text-dark ">
          <div
            className="text-center border-bottom pb-3 pointer"
            onClick={handleMetaMask}
          >
            <img src={MetaMask} alt="metamask" width={50} />
            <span className="ps-4">{t("text_meta_mask")}</span>
          </div>
          <div className="pt-3 text-center pointer" onClick={handleWallet}>
            <img src={WalletConnect} alt="walletConnect" width={50} />
            <span className="ps-4">{t("text_wallet_connect")}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={handleClose}>
            {t("btn_close")}
          </Button>
        </Modal.Footer>
      </Modal>
      {fromCurre.loading ? (
        <div className="d-flex text-center justify-content-center mt-10">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <UserTheme>
            {/* toastify */}
            <div className="App">
              <header className="App-header">
                {user.status && (
                  <button
                    className="walletAddBtn"
                    onClick={handleDisConnect}
                    style={{ marginRight: "7rem" }}
                  >
                    {user.message.wallet_address}
                  </button>
                )}
                <NavLink to="/users">
                  <button className={"walletAddBtn " + (user.status ? "d-block" : "d-none")}>
                    Users
                  </button>
                </NavLink>
              </header>
            </div>
            <section className="cryptocalculator-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 crypto-col">
                    <h3>{t("text_crypto_calculator")}</h3>
                    <p>
                      Find <br /> the current Cryptocurrency values
                    </p>
                  </div>
                  <div className="col-lg-7 text-center">
                    <form method="post">
                      <div className="rate">
                        <h3>{t("text_APU_rate")}</h3>
                        <h2>$0.4484</h2>
                        <div className="row justify-content-center">
                          <div className="col-lg-5 rate-option">
                            <input
                              type="text"
                              id="walletinput"
                              className="form-control theme-input"
                              value={currencyRate.from}
                              name="from"
                              onChange={handleCurrencyRateFrom}
                            />
                            <select
                              className="form-select theme-select-icon custom-select border-0"
                              aria-label="Default select example"
                              name="all_currency"
                              id="walletrate"
                              onChange={handleFromCurrency}
                            >
                              {fromCur.all_from_currency.map((data, index) => {
                                return (
                                  <option
                                    value={data.from_currency_id}
                                    key={index}
                                  >
                                    {data.currency_code}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-lg-2 rate-calculator">
                            <i className="fa-solid fa fa-equals"></i>
                          </div>
                          <div className="col-lg-5 rate-option">
                            <input
                              type="text"
                              className="form-control theme-input"
                              value={currencyRate.to}
                              name="to"
                              onChange={handleCurrencyRateTo}
                            />
                            <select
                              className="form-select theme-select-icon custom-select border-0"
                              aria-label="Default select example"
                            >
                              {!toCur.to_currency_id ? (
                                <option value=""></option>
                              ) : (
                                toCur.to_currency_id.map((data, index) => {
                                  return (
                                    <option
                                      value={data.to_currency_id}
                                      key={index}
                                    >
                                      {data.currency_code}
                                    </option>
                                  );
                                })
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                    {display ? (
                      <div className="row justify-content-center">
                        <div className="col-lg-7 wallet-button text-center text-center mt-5">
                          <button
                            className="btn btn-primary"
                            onClick={handleTransaction}
                          >
                            {t("btn_submit")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="row justify-content-center">
                        <div className="col-lg-7 wallet-button text-center text-center mt-5">
                          <button
                            className="btn btn-primary"
                            onClick={handleConnection}
                          >
                            {t("text_connect_wallet")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </UserTheme>
        </>
      )}
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.userWallet,
  fromCurre: state.fromCurr,
  toCurre: state.toCurr,
  trans: state.transaction,
});

export default connect(mapStateToProps)(Connection);