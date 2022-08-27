import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  GetSettingData,
  UpdateSettingData,
} from "../../Redux/Action/AdminData";
import Spinner from "react-bootstrap/Spinner";
import AdminTheme from "../theme/AdminTheme";
import { t } from "i18next";

const UpdateSetting = ({ dispatch, res, updateSett }) => {
  //store the data of setting
  const [setting, setSetting] = useState({
    maintenance_status: "",
    maintenance_message: "",
    smtp_host: "",
    smtp_user: "",
    smtp_pass: "",
    smtp_port: "",
    smtp_secure: "",
  });
  //get the setting data on page load
  useEffect(() => {
    dispatch(GetSettingData());
  }, [dispatch]);

  useEffect(() => {
    !res.loading &&
      res.data.config_table.map((data) => {
        setting[data.lp_settings_name] = data.lp_settings_value;
      });
  }, [res]);

  //chnage the data of setting
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({
      ...setting,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateSettingData(setting));
  };

  return (
    <>
      <AdminTheme header={t("text_setting")}>
        {res.loading ? (
          <div className="d-flex text-center justify-content-center mt-10">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <>
            <div className="row adminform-row">
              <form method="post">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h3 className="breadcrumb-title">{t("text_setting")}</h3>
                </div>
                {/* smtp host */}
                <div className="mb-3 mt-3">
                  <label htmlFor="smtp_host" className="form-label text-white">
                    Smtp host:
                  </label>
                  <input
                    type="text"
                    className="form-control theme-input admin-input-spacing"
                    id="smtp_host"
                    placeholder="Enter smtp host"
                    name="smtp_host"
                    value={setting.smtp_host}
                    onChange={handleChange}
                  />
                </div>
                {/* smtp port */}
                <div className="mb-3 mt-3">
                  <label htmlFor="smtp_port" className="form-label text-white">
                    Smtp port:
                  </label>
                  <input
                    type="text"
                    className="form-control theme-input admin-input-spacing"
                    id="smtp_port"
                    placeholder="Enter smtp port"
                    name="smtp_port"
                    value={setting.smtp_port}
                    onChange={handleChange}
                  />
                </div>
                {/* smtp user */}
                <div className="mb-3 mt-3">
                  <label htmlFor="smtp_user" className="form-label text-white">
                    Smtp user:
                  </label>
                  <input
                    type="text"
                    className="form-control theme-input admin-input-spacing"
                    id="smtp_user"
                    placeholder="Enter smtp user"
                    name="smtp_user"
                    value={setting.smtp_user}
                    onChange={handleChange}
                  />
                </div>
                {/* smtp pass */}
                <div className="mb-3 mt-3">
                  <label htmlFor="smtp_pass" className="form-label text-white">
                    Smtp pass:
                  </label>
                  <input
                    type="text"
                    className="form-control theme-input admin-input-spacing"
                    id="smtp_pass"
                    placeholder="Enter smtp pass"
                    name="smtp_pass"
                    value={setting.smtp_pass}
                    onChange={handleChange}
                  />
                </div>
                {/* smtp secure */}
                <div className="form-group col-md-6 mb-3">
                  <label htmlFor="smtp_secure " className="mb-3 text-white">
                    Smtp Secure:
                  </label>
                  <div className="form-group col-md-12 mb-3 d-flex">
                    {/* TLS */}
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        id="smtp_secure_tls"
                        name="smtp_secure"
                        type="radio"
                        className="custom-control-input"
                        value="tls"
                        onChange={handleChange}
                        defaultChecked={setting.smtp_secure === "tls" && true}
                      />
                      &nbsp;
                      <label
                        className="custom-control-label"
                        htmlFor="smtp_secure_tls"
                      >
                        TLS
                      </label>
                    </div>
                    {/* SSL */}
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        id="smtp_secure_ssl"
                        name="smtp_secure"
                        type="radio"
                        className="custom-control-input ms-3"
                        value="ssl"
                        onChange={handleChange}
                        defaultChecked={setting.smtp_secure === "ssl" && true}
                      />
                      &nbsp;
                      <label
                        className="custom-control-label"
                        htmlFor="smtp_secure_ssl"
                      >
                        SSL
                      </label>
                    </div>
                  </div>
                </div>
                {/* maintenance message */}
                <div className="mb-3 mt-3">
                  <label htmlFor="maintenance_message" className="form-label text-white">
                    Maintenance message:
                  </label>
                  <input
                    type="text"
                    className="form-control theme-input admin-input-spacing"
                    id="maintenance_message"
                    placeholder="Enter maintenance message"
                    name="maintenance_message"
                    value={setting.maintenance_message}
                    onChange={handleChange}
                  />
                </div>
                {/* maintenance status */}
                <div className="row">
                  <div className="form-group col-md-6 mb-3">
                    <label htmlFor="under_maintenance " className="mb-3 text-white">
                      maintenance status
                    </label>
                    <div className="form-group col-md-12 d-flex">
                      {/* yes */}
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          id="under_maintenance_yes"
                          name="maintenance_status"
                          type="radio"
                          className="custom-control-input"
                          value="1"
                          onChange={handleChange}
                          defaultChecked={
                            setting.maintenance_status === "1" && true
                          }
                        />
                        &nbsp;
                        <label
                          className="custom-control-label"
                          htmlFor="under_maintenance_yes"
                        >
                          yes
                        </label>
                      </div>
                      {/* no */}
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          id="under_maintenance_no"
                          name="maintenance_status"
                          type="radio"
                          className="custom-control-input"
                          value="0"
                          onChange={handleChange}
                          defaultChecked={
                            setting.maintenance_status === "0" && true
                          }
                        />
                        &nbsp;
                        <label
                          className="custom-control-label"
                          htmlFor="under_maintenance_no"
                        >
                          no
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Update button */}
                <button
                  type="submit"
                  className="btn btn-primary "
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </form>
            </div>
          </>
        )}
      </AdminTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.setting,
  updateSett: state.updateSetting,
});

export default connect(mapStateToProps)(UpdateSetting);
