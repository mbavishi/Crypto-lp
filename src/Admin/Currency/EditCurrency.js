import { React, useState, useEffect } from "react";
import { EditCurrencyData } from "../../Redux/Action/AdminData";
import { useNavigate, useParams } from "react-router-dom";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const EditCurrency = ({ dispatch, res }) => {
  const params = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    async function data() {
      var response = await fetch(`/api/get_insert_curr_data/${params.id}`);
      var res_data = await response.json();
      setUserData({
        name: res_data.get_currency_data[0].name,
        currency_code: res_data.get_currency_data[0].currency_code,
        image: res_data.get_currency_data[0].image,
        contract_address: res_data.get_currency_data[0].contract_address,
        abi_key: res_data.get_currency_data[0].abi_key,
        decimal_point: res_data.get_currency_data[0].decimal_point,
        private_key: res_data.get_currency_data[0].private_key,
        receive_wallet_address: res_data.get_currency_data[0].receive_wallet_address,
      })
    }
    data();
  }, [])

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
    return formIsValid;
  }

  // update the curruncy data
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(userData);
    const data = {
      ...userData
    }
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
    !errorValue && dispatch(EditCurrencyData(formData, params.id));
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
              {/* currency code */}
              <div className="mb-3 admin-input-spacing">
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
              <div className="mb-3 admin-input-spacing">
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
              {/* contract address */}
              <div className="mb-3 admin-input-spacing">
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
              {/* Abi key */}
              <div className="mb-3 admin-input-spacing">
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
              {/* decimal point */}
              <div className="mb-3 admin-input-spacing">
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
              <div className="mb-3 admin-input-spacing">
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
              {/* Receive Wallet Address */}
              <div className="mb-3 admin-input-spacing">
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
              {/* Update Button */}
              <div className="text-center mt-5">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleUpdate}
                >
                  {t("text_update")}
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-primary cancel-btn ms-3"
                  type="button"
                >
                  {t("text_cancel")}
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