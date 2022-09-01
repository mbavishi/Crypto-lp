import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddCurrencyPairData,
  CurrencyData,
} from "../../Redux/Action/AdminData";
import Spinner from "react-bootstrap/Spinner";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const AddCurrencyPair = ({ dispatch, res, curr }) => {
  const navigate = useNavigate();

  //store currency pair data
  const [currency, setCurrency] = useState({
    from_currency_id: "",
    to_currency_id: "",
  });
  //handle the validation
  const [state1, setState1] = useState({
    formErrors: {},
  });
  //change currency pair
  const handleCurrency = (e) => {
    const { name, value } = e.target;
    setCurrency({
      ...currency,
      [name]: value,
    });
  };

  // form validation
  function handleFormValidation() {
    const { to_currency_id, from_currency_id } = currency;
    let formErrors = {};
    let formIsValid = true;
    if (!to_currency_id) {
      formIsValid = true;
      formErrors["toCurrencyErr"] = t("translation2:err_to_curr_req");
    }
    if (!from_currency_id) {
      formIsValid = true;
      formErrors["fromCurrencyErr"] = t("translation2:err_from_curr_req");
    }
    setState1({ formErrors: formErrors });
    return formIsValid;
  }
  //add the currency pair
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormValidation();
    dispatch(AddCurrencyPairData(currency));
  };
  const add = res.data;

  //get the data of currency on load
  useEffect(() => {
    dispatch(CurrencyData());
  }, [dispatch]);
  const data = curr.data;

  return (
    <>
      <Title props={t("text_add_currency")} />
      <AdminTheme header={t("text_add_currency")}>
        {curr.loading ? (
          <div className="loader">
            <Spinner />
          </div>
        ) : (
          <>
            <div className='col-6 mx-auto'>
              <div className="row adminform-row">
                <form>
                  {/* title */}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3 className="breadcrumb-title">{t("text_add_currency")}</h3>
                  </div>
                  {/* from currency */}
                  <div className="mb-4 mt-3">
                    <label
                      htmlFor="from_currency_id"
                      className="form-label text-white"
                    >
                      {t("text_from_currency")}
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="from_currency_id"
                      onChange={handleCurrency}
                    >
                      {/* <option value="">--Select Currency--</option> */}
                      {data.currency_data.map((data, index) => {
                        return (
                          <option value={data.id} key={index}>
                            {data.currency_code}
                          </option>
                        );
                      })}
                    </select>
                    <label
                      htmlFor="from_currency_id"
                      generated="true"
                      className={
                        "error " +
                        (state1.formErrors.fromCurrencyErr
                          ? " d-block"
                          : "d-none")
                      }
                    >
                      {state1.formErrors.fromCurrencyErr}
                    </label>
                  </div>
                  {/* to currency */}
                  <div className="mb-3 mt-3">
                    <label
                      htmlFor="to_currency_id"
                      className="form-label text-white"
                    >
                      {t("text_to_currency")}
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="to_currency_id"
                      onChange={handleCurrency}
                    >
                      {/* <option value="">--Select Currency--</option> */}
                      {data.currency_data.map((data, index) => {
                        return (
                          <option value={data.id} key={index}>
                            {data.currency_code}
                          </option>
                        );
                      })}
                    </select>
                    <label
                      htmlFor="to_currency_id"
                      generated="true"
                      className={
                        "error " +
                        (state1.formErrors.toCurrencyErr
                          ? " d-block"
                          : "d-none")
                      }
                    >
                      {state1.formErrors.toCurrencyErr}
                    </label>
                  </div>
                  <div className="text-center mt-5">
                    {/* button add */}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {t("text_add")}
                    </button>
                    {/* button cancel */}
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
          </>
        )}
      </AdminTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.addCurrPair,
  curr: state.curr,
});

export default connect(mapStateToProps)(AddCurrencyPair);
