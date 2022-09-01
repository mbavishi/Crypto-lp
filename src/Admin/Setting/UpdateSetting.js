import React, { useEffect, useState } from "react";
import {
  SettingData,
  UpdateSettingData,
} from "../../Redux/Action/AdminData";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { connect } from "react-redux";
import CkEditor from "./ckEditor";
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
    copyright_text: ""
  });

  //get the setting data on page load
  useEffect(() => {
    dispatch(SettingData());
  }, [dispatch]);
  const data = res.data;

  useEffect(() => {
    setSetting({
      ...setting,
      maintenance_status: data.maintenance_status,
      maintenance_message: data.maintenance_message,
      smtp_host: data.smtp_host,
      smtp_user: data.smtp_user,
      smtp_pass: data.smtp_pass,
      smtp_port: data.smtp_port,
      smtp_secure: data.smtp_secure,
      copyright_text: data.copyright_text
    })
  }, [data]);

  //chnage the data of setting
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({
      ...setting,
      [name]: value,
    })
  }

  const handleEditor = (data) => {
    setSetting({
      ...setting,
      copyright_text: data
    })
  }

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
                  <div className="row">
                    {/* setting */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                      <h3 className="breadcrumb-title">{t("text_setting")}</h3>
                    </div>
                    {/* smtp setting */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-4">
                      <h5>{t("text_smtp_settings")}</h5>
                    </div>
                    <div className="col">
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
                    </div>
                    <div className="col">
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
                              value="TLS"
                              onChange={handleChange}
                              checked={setting.smtp_secure === "TLS" && true}
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
                              value="SSL"
                              onChange={handleChange}
                              checked={setting.smtp_secure === "SSL" && true}
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
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-4">
                      <h5>{t("text_maintenance")}</h5>
                    </div>
                    {/* maintenance message */}
                    <div className="admin-input-spacing">
                      <label htmlFor="maintenance_message" className="form-label text-white">
                        {t("text_maintenance_message")}
                      </label>
                      <textarea
                        type="text"
                        className="form-control theme-input"
                        id="maintenance_message"
                        placeholder="We are working on Launchpad"
                        name="maintenance_message"
                        value={setting.maintenance_message}
                        onChange={handleChange}
                        rows={3}
                      ></textarea>
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
                              Yes
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
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-4">
                      <h5>{t("text_web_settings")}</h5>
                    </div>
                    <div className="row admin-input-spacing">
                      <div className="form-group col-md-12">
                        <label htmlFor="copyright" className="form-label text-white">
                          {t("text_copyrights")}
                        </label>
                        <CkEditor props={setting.copyright_text} handleEditor={handleEditor} />
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
        )
        }
      </AdminTheme >
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.SettingData,
});

export default connect(mapStateToProps)(UpdateSetting);
