import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResetPsd } from "../../Redux/Action/AdminData";
import UserTheme from "../../User/theme/userTheme";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const Login = ({ dispatch, resetPsd, updatePsd }) => {
  const history = useNavigate();
  const location = useLocation();

  //store the login data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  // form validation
  const [state1, setState1] = useState({
    formErrors: {},
  });
  //handle reset modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  //handle confirm otp  modal
  const [confirmShow, setConfirmShow] = useState(false);
  const handleConfirmClose = () => {
    confirmShow(false);
  };
  //store reset password data
  const [resetPsdData, setResetPsdData] = useState({
    email: "",
  });
  //store the user enter otp
  const [otpData, setOtpData] = useState({
    otp: "",
  });

  // handle the login change data
  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //connection successfully notify
  const notify = (data) => {
    if (data.status === true) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  function handleFormValidation() {
    const { username, password } = loginData;
    let formErrors = {};
    let formIsValid = false;
    if (!username) {
      formIsValid = true;
      formErrors["userNameErr"] = t("translation2:err_user_name_req");
    }
    if (!password) {
      formIsValid = true;
      formErrors["passwordErr"] = t("translation2:err_password_req");
    }
    setState1({ formErrors: formErrors });
    return formIsValid;
  }

  // function call on click of sign in button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValue = handleFormValidation();

    // handleFormValidation();
    if (!errorValue) {
      var response = await fetch("/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      var res_data = await response.json();
      if (res_data.status === true) {
        sessionStorage.setItem("isAdminLogedIn", true)
        sessionStorage.setItem("UserData", JSON.stringify(res_data.message));
        history("/dashboard");
        notify(res_data);
      }
      else {
        toast.error(res_data.message)
      }
    }
  }

  //function call on click forgot password
  const handleReset = (e) => {
    setShow(true);
  };

  //change reset password email
  const handleEmail = (e) => {
    const { name, value } = e.target;
    setResetPsdData({
      ...resetPsdData,
      [name]: value,
    });
  };

  //handle reset password otp data
  const handleResetPassword = () => {
    dispatch(ResetPsd(resetPsdData));
  };
  var otpResetData = resetPsd.data;

  useEffect(() => {
    if (!location.state && resetPsd.data.status == true) {
      handleClose();
      setConfirmShow(true);
    } else if (resetPsd.data.status === false) {
      handleClose();
    } else if (location.state) {
      setConfirmShow(false);
    }
  }, [resetPsd.data]);

  //handle the otp data
  const handleOtp = (e) => {
    const { name, value } = e.target;
    setOtpData({
      ...loginData,
      [name]: value,
    });
  };


  //compare the otp
  const handleCompareOtp = () => {
    if (otpData.otp === otpResetData.otp) {
      history("/updatepsd");
    } else {
      handleConfirmClose();
      toast.error("please enter valid otp");
    }
  };

  return (
    <>
      <Title props={t("text_login")} />
      {/* modal reset password */}
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header>
          <h6 className="text-dark">Reset password</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <span>
                <label className="text-dark">
                  Enter email address
                  <span className="required" aria-required="true">
                    &nbsp;*&nbsp;
                  </span>
                  -
                </label>
                <input
                  name="email"
                  type="text"
                  className="form-control b-bottom m-0"
                  placeholder="email address"
                  onChange={handleEmail}
                  value={resetPsdData.email}
                />
              </span>
            </div>
          </div>
          <div id="recaptcha-container" />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-add" onClick={handleClose}>
            {t("btn_close")}
          </Button>
          <Button className="btn-add" onClick={handleResetPassword}>
            send otp
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal otp */}
      <Modal show={confirmShow} onHide={handleClose} animation={true}>
        <Modal.Header>
          <h6 className="text-dark">Otp</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <span>
                <label className="text-dark">
                  Enter otp
                  <span className="required" aria-required="true">
                    &nbsp;*&nbsp;
                  </span>
                  -
                </label>
                <input
                  name="otp"
                  type="text"
                  className="form-control b-bottom m-0"
                  placeholder="enter otp"
                  onChange={handleOtp}
                  value={otpData.otp}
                />
              </span>
            </div>
          </div>
          <div id="recaptcha-container" />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-lightgray" onClick={handleConfirmClose}>
            {t("btn_close")}
          </Button>
          <Button className="btn-lightpink" onClick={handleCompareOtp}>
            verify
          </Button>
        </Modal.Footer>
      </Modal>
      <UserTheme>
        {/* login section */}
        <section className="login-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <h1 className="theme-title text-center">{t("text_welcome")}</h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="theme-bg theme-subtitle">
                  <h2>{t("text_signin")}</h2>
                  <form method="post" className="needs-validation mt-5">
                    {/* Username */}
                    <div className="input-group has-validation mb-3">
                      <input
                        type="text"
                        className="form-control theme-input pb-2"
                        placeholder="username"
                        value={loginData.username}
                        name="username"
                        onChange={handleLoginData}
                      />
                      <span
                        className="input-group-icon theme-input"
                        id="user-username"
                      >
                        <i className="fa-solid fa fa-user"></i>
                      </span>
                    </div>
                    <label
                      htmlFor="UserName"
                      generated="true"
                      className={
                        "error " +
                        (state1.formErrors.userNameErr
                          ? " d-block"
                          : "d-none")
                      }
                    >
                      {state1.formErrors.userNameErr}
                    </label>
                    {/* password */}
                    <div className="input-group has-validation mb-3">
                      <input
                        type="password"
                        className="form-control theme-input pb-2"
                        placeholder="password"
                        value={loginData.password}
                        name="password"
                        onChange={handleLoginData}
                      />
                      <span
                        className="input-group-icon theme-input"
                        id="user-password"
                      >
                        <i className="fa-solid fa fa-lock"></i>
                      </span>
                    </div>
                    <label
                      htmlFor="Password"
                      generated="true"
                      className={
                        "error " +
                        (state1.formErrors.passwordErr
                          ? " d-block"
                          : "d-none")
                      }
                    >
                      {state1.formErrors.passwordErr}
                    </label>
                    <div
                      className="forgot-password text-end"
                      onClick={handleReset}
                    >
                      <span className="a pointer">
                        {t("text_forgot_password")}
                      </span>
                    </div>
                    {/* submit */}
                    <div className="text-center mt-5">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {t("text_signin")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* copyright text */}
            <div className="row">
              <div className="col-md-12 copyright text-center mt-0">
                <p className="mt-4">{t("text_copyright")}</p>
              </div>
            </div>
          </div>
        </section>
      </UserTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  resetPsd: state.resetPsd,
});

export default connect(mapStateToProps)(Login);
