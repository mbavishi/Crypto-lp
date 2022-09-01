import { React, useEffect, useState } from "react";
import { ResetPsd, DefaultLogin } from "../../Redux/Action/AdminData";
import { useNavigate, useLocation } from "react-router-dom";
import UserTheme from "../../User/theme/userTheme";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Title from "../../common/title";
import { connect } from "react-redux";
import Footer from "../theme/footer";
import { t } from "i18next";

const Login = ({ dispatch, resetPsd, resDefaultLogin }) => {
  const history = useNavigate();
  const location = useLocation();

  //store the login data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(DefaultLogin());
  }, [dispatch])
  const data = resDefaultLogin.data;

  var val = data.admin && data.admin[0].default_login;
  useEffect(() => {
    if (val === "1") {
      setLoginData(
        {
          username: "admin",
          password: "password"
        }
      )
    }
  }, [val])

  // form validation
  const [state1, setState1] = useState({
    formErrors: {},
  });
  const [state2, setState2] = useState({
    formErrors: {},
  });
  const [state3, setState3] = useState({
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
    setConfirmShow(false);
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

  function handleFormValidation2() {
    const { email } = resetPsdData;
    let formErrors = {};
    let formIsValid = false;
    if (!email) {
      formIsValid = true;
      formErrors["emailErr"] = t("translation2:err_email_req");
    }
    setState2({ formErrors: formErrors });
    return formIsValid;
  }

  function handleFormValidation3() {
    const { otp } = resetPsdData;
    let formErrors = {};
    let formIsValid = false;
    if (!otp) {
      formIsValid = true;
      formErrors["otpErr"] = t("translation2:err_otp_req");
    }
    setState3({ formErrors: formErrors });
    return formIsValid;
  }

  // function call on click of sign in button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValue = handleFormValidation();
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
  const handleReset = () => {
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
    let error = handleFormValidation2();
    !error && dispatch(ResetPsd(resetPsdData));
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
    let error = handleFormValidation3()
    if (!error) {
      if (otpData.otp === otpResetData.otp) {
        history("/updatepsd");
      } else {
        handleConfirmClose();
        toast.error("please enter valid otp");
      }
    }
  };

  return (
    <>
      <Title props={t("text_login")} />
      {/* modal reset password */}
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header className="text-center">
          <h3>{t("text_reset_password")}</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <span>
                <label className="form-label1">
                  {t("text_enter_mail")}
                  <span className="required" aria-required="true">
                    &nbsp;*&nbsp;
                  </span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control theme-input text-dark"
                  placeholder="email address"
                  onChange={handleEmail}
                  value={resetPsdData.email}
                />
                <label
                  htmlFor="email"
                  generated="true"
                  className={
                    "error " +
                    (state2.formErrors.emailErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {state2.formErrors.emailErr}
                </label>
              </span>
            </div>
          </div>
          {/* <div id="recaptcha-container" /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-add" onClick={handleClose}>
            {t("btn_close")}
          </Button>
          <Button className="btn-add" onClick={handleResetPassword}>
            {t("text_send_otp")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal otp */}
      <Modal show={confirmShow} onHide={handleClose} animation={true}>
        <Modal.Header>
          <h6 className="text-dark">{t("text_otp")}</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <span>
                <label className="text-dark">
                  {t("text_Enter_otp")}
                  <span className="required" aria-required="true">
                    &nbsp;*&nbsp;
                  </span>
                </label>
                <input
                  name="otp"
                  type="text"
                  className="form-control theme-input text-dark"
                  placeholder="enter otp"
                  onChange={handleOtp}
                  value={otpData.otp}
                />
                <label
                  htmlFor="otp"
                  generated="true"
                  className={
                    "error " +
                    (state3.formErrors.otpErr
                      ? " d-block"
                      : "d-none")
                  }
                >
                  {state3.formErrors.otpErr}
                </label>
              </span>
            </div>
          </div>
          <div id="recaptcha-container" />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-add" onClick={handleConfirmClose}>
            {t("btn_close")}
          </Button>
          <Button className="btn-add" onClick={handleCompareOtp}>
            {t("text_verify")}
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
                        placeholder="Username"
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
                        placeholder="Password"
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
            <Footer />
          </div>
        </section>
      </UserTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  resetPsd: state.resetPsd,
  resDefaultLogin: state.DefaultLogin,
});

export default connect(mapStateToProps)(Login);