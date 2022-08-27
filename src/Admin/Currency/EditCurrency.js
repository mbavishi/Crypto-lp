import { React, useState } from "react";
import { EditCurrencyData } from "../../Redux/Action/AdminData";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const EditCurrency = ({ dispatch, res }) => {
  const id = 1
  //store the data of currency
  const [userData, setUserData] = useState({
    name: "",
    currency_code: "",
    image: "",
    contract_address: "",
    abi_key: "",
    decimal_point: "",
    private_key: "",
    receive_wallet_address: "",
  });

  //handle the validation
  const [error, setError] = useState({
    formErrors: {},
  });

  //change currency data
  const handleChange = (e) => {
    const { name } = e.target;

    if (name === "image") var value = e.target.files[0];
    else value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // form validation
  function handleFormValidation() {
    const {
      name,
      currency_code,
      image,
      contract_address,
      abi_key,
      decimal_point,
      private_key,
      receive_wallet_address,
    } = userData;
    let formErrors = {};
    let formIsValid = false;
    if (!name) {
      formIsValid = true;
      formErrors["nameErr"] = "";
    }
    if (!currency_code) {
      formIsValid = true;
      formErrors["currencyCodeErr"] = "";
    }
    if (!image) {
      formIsValid = true;
      formErrors["imageErr"] = "";
    }
    if (!contract_address) {
      formIsValid = true;
      formErrors["contractAddErr"] = "";
    }
    if (!abi_key) {
      formIsValid = true;
      formErrors["abiKeyErr"] = "";
    }
    if (!decimal_point) {
      formIsValid = true;
      formErrors["decimalPointErr"] = "";
    }
    if (!private_key) {
      formIsValid = true;
      formErrors["privateKeyErr"] = "";
    }
    if (!receive_wallet_address) {
      formIsValid = true;
      formErrors["receiveWalletErr"] = "";
    }
    setError({ formErrors: formErrors });
    return formIsValid;
  }

  // update the curruncy data
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const errorValue = handleFormValidation();
    formData.append("name", userData.name);
    formData.append("currency_code", userData.currency_code);
    formData.append("image", userData.image);
    formData.append("contract_address", userData.contract_address);
    formData.append("abi_key", userData.abi_key);
    formData.append("decimal_point", userData.decimal_point);
    formData.append("private_key", userData.private_key);
    formData.append("receive_wallet_address", userData.receive_wallet_address);
    !errorValue && dispatch(EditCurrencyData(formData, id));
  };

  return (
    <>
      <Title props={t("text_edit_currency")} />
      <AdminTheme header={t("text_edit_currency")}>
        <div className="col-md-6 mx-auto">
          <div className="row adminform-row">
            <form>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                <h3 className="breadcrumb-title">{t("text_edit_currency")}</h3>
              </div>
              {/* Name */}
              <div className="mb-3 admin-input-spacing">
                <label htmlFor="name" className="form-label text-white">
                  {t("text_name")}
                </label>
                <input
                  type="text"
                  className="form-control theme-input"
                  id="name"
                  placeholder="Enter name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              {/* currency code */}
              <div className="mb-3">
                <label htmlFor="currency_code" className="form-label text-white">
                  currency code:
                </label>
                <input
                  type="text"
                  className="form-control theme-input"
                  id="currency_code"
                  placeholder="Enter currencycode"
                  name="currency_code"
                  value={userData.currency_code}
                  onChange={handleChange}
                />
              </div>
              {/* Image */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label text-white">
                  image :
                </label>
                <input
                  type="file"
                  className="form-control theme-input"
                  id="image"
                  placeholder="Enter currencycode"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              {/* contract address */}
              <div className="mb-3">
                <label htmlFor="contract_address" className="form-label text-white">
                  contract address:
                </label>
                <input
                  type="text"
                  className="form-control theme-input"
                  id="contract_address"
                  placeholder="Enter contract address"
                  name="contract_address"
                  value={userData.contract_address}
                  onChange={handleChange}
                />
              </div>
              {/* Abi key */}
              <div className="mb-3">
                <label htmlFor="abi_key" className="form-label text-white">
                  abi key:
                </label>
                <input
                  type="email"
                  className="form-control theme-input"
                  id="abi_key"
                  placeholder="Enter abi key"
                  name="abi_key"
                  value={userData.abi_key}
                  onChange={handleChange}
                />
              </div>
              {/* decimal point */}
              <div className="mb-3">
                <label htmlFor="decimal_point" className="form-label text-white">
                  decimal point:
                </label>
                <input
                  type="email"
                  className="form-control theme-input"
                  id="decimal_point"
                  placeholder="Enter decimal point"
                  name="decimal_point"
                  value={userData.decimal_point}
                  onChange={handleChange}
                />
              </div>
              {/* Private Key */}
              <div className="mb-3">
                <label htmlFor="private_key" className="form-label text-white">
                  private key:
                </label>
                <input
                  type="email"
                  className="form-control theme-input"
                  id="private_key"
                  placeholder="Enter private_key"
                  name="private_key"
                  value={userData.private_key}
                  onChange={handleChange}
                />
              </div>
              {/* Receive Wallet Address */}
              <div className="mb-3">
                <label htmlFor="receive_wallet_address" className="form-label text-white">
                  receive wallet address:
                </label>
                <input
                  type="email"
                  className="form-control theme-input"
                  id="receive_wallet_address"
                  placeholder="Enter receive wallet address"
                  name="receive_wallet_address"
                  value={userData.receive_wallet_address}
                  onChange={handleChange}
                />
              </div>
              {/* Update Button */}
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.updateCurr,
});

export default connect(mapStateToProps)(EditCurrency);