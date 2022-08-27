import { React, useEffect, useState } from "react";
import { updatePsd } from "../../Redux/Action/AdminData";
import UserTheme from "../../User/theme/userTheme";
import { useNavigate } from "react-router-dom";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const UpdatePassword = ({ dispatch, update }) => {
  const navigate = useNavigate();

  //store password data
  const [passwordData, setPasswordData] = useState({
    new_password: "",
    c_password: "",
  });

  // handle password data
  const handlePasswordData = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  //update the password on click update button
  const handleSubmit = () => {
    dispatch(updatePsd(passwordData));
  };

  useEffect(() => {
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
              <form method="post" className="needs-validation mt-5">
                {/* password */}
                <div className="input-group has-validation mb-3">
                  <input
                    type="text"
                    className="form-control theme-input pb-2"
                    placeholder="new password"
                    value={passwordData.new_password}
                    name="new_password"
                    onChange={handlePasswordData}
                  />
                </div>
                {/* confirm password */}
                <div className="input-group has-validation mb-3">
                  <input
                    type="text"
                    className="form-control theme-input pb-2"
                    placeholder=" confirm password"
                    value={passwordData.c_password}
                    name="c_password"
                    onChange={handlePasswordData}
                  />
                </div>
                {/* update */}
                <div className="text-center mt-5">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {t("text_update")}
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
      </UserTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  update: state.updatePsd,
});

export default connect(mapStateToProps)(UpdatePassword);
