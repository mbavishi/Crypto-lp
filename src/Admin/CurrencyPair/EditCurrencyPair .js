import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditCurrencyPairData,
  CurrencyData,
} from "../../Redux/Action/AdminData";
import Spinner from "react-bootstrap/Spinner";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const EditCurrencyPair = ({ dispatch, res, curr }) => {
  const navigate = useNavigate();
  const params = useParams();

  //store currency pair data
  const [currency, setCurrency] = useState({
    from_currency_id: "",
    to_currency_id: "",
  });

  //change currency pair
  const handleCurrency = (e) => {
    const { name, value } = e.target;
    setCurrency({
      ...currency,
      [name]: value,
    });
  };

  //add the currency pair
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(EditCurrencyPairData(currency, params.id));
  };
  const editCurr = res;

  //get the data of currency on load
  useEffect(() => {
    dispatch(CurrencyData());
  }, [dispatch]);
  const data = curr.data;

  return (
    <>
      <Title props={t("text_edit_currency")} />
      <AdminTheme header={t("text_edit_currency")}>
        {curr.loading ? (
          <div className="loader">
            <Spinner />
          </div>
        ) : (
          <>
            <div className='col-6 mx-auto'>
              <div className="row adminform-row">
                <form>
                  {/* from currency */}
                  <div className="mb-4 mt-3">
                    <label htmlFor="name" className="form-label text-white">
                      {t("text_from_currency")}
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="from_currency_id"
                      onChange={handleCurrency}
                    >
                      {data.currency_data.map((data, index) => {
                        return (
                          <option value={data.id} key={index}>
                            {data.currency_code}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* to currency */}
                  <div className="mb-3 mt-3">
                    <label
                      htmlFor="currency_code"
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
                      {data.currency_data.map((data, key) => {
                        return (
                          <option value={data.id} key={key}>
                            {data.currency_code}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* submit */}
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {t("text_edit")}
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
          </>
        )}
      </AdminTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.updateCurrPair,
  curr: state.curr,
});

export default connect(mapStateToProps)(EditCurrencyPair);
