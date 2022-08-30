import React, { useEffect, useState } from "react";
import {
  GetSettingData,
  UpdateSettingData,
} from "../../Redux/Action/AdminData";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import { t } from "i18next";

const UpdateSetting = ({ dispatch, res }) => {
  const navigate = useNavigate()
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
    res.data.config_table &&
      setSetting({
        maintenance_status: res.data.config_table[8].lp_settings_value,
        maintenance_message: res.data.config_table[9].lp_settings_value,
        smtp_host: res.data.config_table[1].lp_settings_value,
        smtp_user: res.data.config_table[3].lp_settings_value,
        smtp_pass: res.data.config_table[4].lp_settings_value,
        smtp_port: res.data.config_table[2].lp_settings_value,
        smtp_secure: res.data.config_table[5].lp_settings_value,
      })
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
      <Title props={t("text_setting")} />
      <AdminTheme header={t("text_setting")}>
        {res.loading ? (
          <div className="loader">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="col-6 mx-auto">
              <div className="row adminform-row">
                <form method="post">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3 className="breadcrumb-title">{t("text_setting")}</h3>
                  </div>
                  {/* smtp host */}
                  <div className="admin-input-spacing">
                    <label htmlFor="smtp_host" className="form-label text-white">
                      {t("text_smtp_host")}
                    </label>
                    <input
                      type="text"
                      className="form-control theme-input"
                      id="smtp_host"
                      placeholder="Enter smtp host"
                      name="smtp_host"
                      value={setting.smtp_host}
                      onChange={handleChange}
                    />
                  </div>
                  {/* smtp port */}
                  <div className="admin-input-spacing">
                    <label htmlFor="smtp_port" className="form-label text-white">
                      {t("text_smtp_port")}
                    </label>
                    <input
                      type="text"
                      className="form-control theme-input"
                      id="smtp_port"
                      placeholder="Enter smtp port"
                      name="smtp_port"
                      value={setting.smtp_port}
                      onChange={handleChange}
                    />
                  </div>
                  {/* smtp user */}
                  <div className="admin-input-spacing">
                    <label htmlFor="smtp_user" className="form-label text-white">
                      {t("text_smtp_user")}
                    </label>
                    <input
                      type="text"
                      className="form-control theme-input"
                      id="smtp_user"
                      placeholder="Enter smtp user"
                      name="smtp_user"
                      value={setting.smtp_user}
                      onChange={handleChange}
                    />
                  </div>
                  {/* smtp pass */}
                  <div className="admin-input-spacing">
                    <label htmlFor="smtp_pass" className="form-label text-white">
                      {t("text_smtp_pass")}
                    </label>
                    <input
                      type="text"
                      className="form-control theme-input"
                      id="smtp_pass"
                      placeholder="Enter smtp pass"
                      name="smtp_pass"
                      value={setting.smtp_pass}
                      onChange={handleChange}
                    />
                  </div>
                  {/* smtp secure */}
                  <div className="form-group col-md-6 admin-input-spacing">
                    <label htmlFor="smtp_secure " className="form-label text-white">
                      {t("text_smtp_secure")}
                    </label>
                    <div className="form-group col-md-12 d-flex">
                      {/* TLS */}
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          id="smtp_secure_tls"
                          name="smtp_secure"
                          type="radio"
                          className="custom-control-input"
                          value="tls"
                          onChange={handleChange}
                          checked={setting.smtp_secure === "tls" && true}
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
                          checked={setting.smtp_secure === "ssl" && true}
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
                  <div className="admin-input-spacing">
                    <label htmlFor="maintenance_message" className="form-label text-white">
                      {t("text_maintenance_message")}
                    </label>
                    <input
                      type="text"
                      className="form-control theme-input"
                      id="maintenance_message"
                      placeholder="Enter maintenance message"
                      name="maintenance_message"
                      value={setting.maintenance_message}
                      onChange={handleChange}
                    />
                  </div>
                  {/* maintenance status */}
                  <div className="row admin-input-spacing">
                    <div className="form-group col-md-6">
                      <label htmlFor="under_maintenance" className="form-label text-white">
                        {t("text_maintenance_message")}
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
                            checked={
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
                            checked={
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
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
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
          </>
        )}
      </AdminTheme>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.setting,
});

export default connect(mapStateToProps)(UpdateSetting);
