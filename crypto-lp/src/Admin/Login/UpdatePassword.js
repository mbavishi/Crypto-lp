import { React, useEffect, useState } from "react";
import { updatePsd } from "../../Redux/Action/AdminData";
import UserTheme from "../../User/theme/userTheme";
import { useNavigate } from "react-router-dom";
import Title from "../../common/title";
import { connect } from "react-redux";
import Footer from "../theme/footer";
import { t } from "i18next";

const UpdatePassword = ({ dispatch, update }) => {
  const navigate = useNavigate();

  //store password data
  const [passwordData, setPasswordData] = useState({
    new_password: "",
    c_password: "",
  });
  // form validation
  const [state1, setState1] = useState({
    formErrors: {},
  });

  // handle password data
  const handlePasswordData = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  function handleFormValidation() {
    const { new_password, c_password } = passwordData;
    let formErrors = {};
    let formIsValid = false;
    if (!new_password) {
      formIsValid = true;
      formErrors["newPasswordErr"] = t("translation2:err_user_name_req");
    }
    if (!c_password) {
      formIsValid = true;
      formErrors["confPasswordErr"] = t("translation2:err_password_req");
    }
    setState1({ formErrors: formErrors });
    return formIsValid;
  }

  //update the password on click update button
  const handleSubmit = () => {
    let error = handleFormValidation()
    !error && dispatch(updatePsd(passwordData));
  };

  useEffect(() => {
    console.log(update);
    if (update.data.status === true) {
      navigate("/admin", {
        state: {
          value: true,
        },
      });
    }
  }, [update.data]);

  return (
    <>
      <Title props={t("text_update_password")} />
      <UserTheme>
        <div className="row justify-content-center mt-5">
          <div className="col-lg-5 col-md-12 col-sm-12 mt-5">
            <div className="theme-bg theme-subtitle">
              <h2>{t("text_update_password")}</h2>
              <form className="mt-5">
                {/* password */}
                <div className="input-group has-validation mb-3">
                  <input
                    type="text"
                    className="form-control theme-input pb-2"
                    placeholder="New Password"
                    value={passwordData.new_password}
                    name="new_password"
                    onChange={handlePasswordData}
                  />
                </div>
                <label
                  htmlFor="Password"
                  generated="true"
                  className={
                    "error " +
                    (state1.formErrors.newPasswordErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {state1.formErrors.newPasswordErr}
                </label>
                {/* confirm password */}
                <div className="input-group has-validation mb-3">
                  <input
                    type="text"
                    className="form-control theme-input pb-2"
                    placeholder="Confirm Password"
                    value={passwordData.c_password}
                    name="c_password"
                    onChange={handlePasswordData}
                  />
                </div>
                <label
                  htmlFor="Password"
                  generated="true"
                  className={
                    "error " +
                    (state1.formErrors.confPasswordErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {state1.formErrors.confPasswordErr}
                </label>
                {/* update */}
                <div className="text-center mt-5">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {t("text_update")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </UserTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  update: state.updatePsd,
});

export default connect(mapStateToProps)(UpdatePassword);
