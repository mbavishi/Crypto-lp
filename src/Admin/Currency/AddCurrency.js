import { React, useState } from "react";
import { AddCurrencyData } from "../../Redux/Action/AdminData";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const AddCurrency = ({ dispatch, res }) => {
  //store currency data
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
      formErrors["nameErr"] = t("translation2:err_name_req");
    }
    if (!currency_code) {
      formIsValid = true;
      formErrors["currencyCodeErr"] = t("translation2:err_curr_code_req");
    }
    if (!image) {
      formIsValid = true;
      formErrors["imageErr"] = t("translation2:err_img_req");
    }
    if (!contract_address) {
      formIsValid = true;
      formErrors["contractAddErr"] = t("translation2:err_contract_add_req");
    }
    if (!abi_key) {
      formIsValid = true;
      formErrors["abiKeyErr"] = t("translation2:err_abi_key_req");
    }
    if (!decimal_point) {
      formIsValid = true;
      formErrors["decimalPointErr"] = t("translation2:err_decimal_point_req");
    }
    if (!private_key) {
      formIsValid = true;
      formErrors["privateKeyErr"] = t("translation2:err_private_key_req");
    }
    if (!receive_wallet_address) {
      formIsValid = true;
      formErrors["receiveWalletErr"] = t("translation2:err_receive_wallet_add_req");
    }
    setError({ formErrors: formErrors });
    return formIsValid
  }

  console.log(error.formErrors.nameErr);
  //add currency data
  const handleUpdate = (e) => {
    e.preventDefault();
    const errorValue = handleFormValidation();
    console.log(errorValue);
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("currency_code", userData.currency_code);
    formData.append("image", userData.image);
    formData.append("contract_address", userData.contract_address);
    formData.append("abi_key", userData.abi_key);
    formData.append("decimal_point", userData.decimal_point);
    formData.append("private_key", userData.private_key);
    formData.append("receive_wallet_address", userData.receive_wallet_address);
    !errorValue && dispatch(AddCurrencyData(formData))
  };

  console.log(res);
  return (
    <>
      <Title props={t("text_add_currency")} />
      <AdminTheme header={t("text_add_currency")}>
        <div className="col-md-6 mx-auto">
          <div className="row adminform-row">
            <form>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                <h3 className="breadcrumb-title">{t("text_add_currency")}</h3>
              </div>

              {/* Name */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control theme-input admin-input-spacing"
                  id="name"
                  placeholder="Name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.nameErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.nameErr}
                </label>
              </div>
              {/* Currency code */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control theme-input admin-input-spacing"
                  id="currency_code"
                  placeholder="Currencycode"
                  name="currency_code"
                  value={userData.currency_code}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.currencyCodeErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.currencyCodeErr}
                </label>
              </div>
              {/* Image */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label text-white">
                  Image :
                </label>
                <input
                  type="file"
                  className="form-control theme-input admin-input-spacing"
                  id="image"
                  placeholder="Enter currencycode"
                  name="image"
                  onChange={handleChange}
                />
                <label
                  htmlFor="image"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.imageErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.imageErr}
                </label>
              </div>
              {/* Contract Address */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control theme-input admin-input-spacing"
                  id="contract_address"
                  placeholder="Contract Address"
                  name="contract_address"
                  value={userData.contract_address}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.contractAddErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.contractAddErr}
                </label>
              </div>
              {/* Abi Key */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control theme-input admin-input-spacing"
                  id="abi_key"
                  placeholder="Abi key"
                  name="abi_key"
                  value={userData.abi_key}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.abiKeyErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.abiKeyErr}
                </label>
              </div>
              {/* Decimal Point */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control theme-input admin-input-spacing"
                  id="decimal_point"
                  placeholder="Decimal Point"
                  name="decimal_point"
                  value={userData.decimal_point}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.decimalPointErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.decimalPointErr}
                </label>
              </div>
              {/* Private Key */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control theme-input admin-input-spacing"
                  id="private_key"
                  placeholder="Private Key"
                  name="private_key"
                  value={userData.private_key}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.privateKeyErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.privateKeyErr}
                </label>
              </div>
              {/* Wallet Address */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control theme-input admin-input-spacing"
                  id="receive_wallet_address"
                  placeholder="Receive wallet address"
                  name="receive_wallet_address"
                  value={userData.receive_wallet_address}
                  onChange={handleChange}
                />
                <label
                  htmlFor="UserName"
                  generated="true"
                  className={
                    "error " +
                    (error.formErrors.receiveWalletErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {error.formErrors.receiveWalletErr}
                </label>
              </div>
              {/* Add button */}
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Add
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
  res: state.addCurr,
});

export default connect(mapStateToProps)(AddCurrency);
