import { React, useState, useEffect } from 'react';
import {
    GetSettingData,
    UpdateSettingData,
} from "../../Redux/Action/AdminData";
import { useNavigate } from 'react-router-dom';
import AdminTheme from '../theme/AdminTheme';
import { toast } from "react-toastify";
import Title from '../../common/title';
import { connect } from "react-redux";
import { t } from 'i18next';

const Maintenance = ({ dispatch, res, updateSett }) => {
    const navigate = useNavigate();

    //store the data of setting
    const [setting, setSetting] = useState({
        maintenance_status: "",
        maintenance_message: "",
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

    const notify = (data) => { toast.success(data) }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdateSettingData(setting));
    };
    const update = updateSett.data;
    if (update.status == true) {
        notify(update.maintenance_message)
    }
    else {
        console.log(update);
    }

    return (
        <>
            <Title props={t("text_maintenance")} />
            <AdminTheme header={t("text_maintenance")}>
                <div className='col-6 mx-auto'>
                    <div className="row adminform-row">
                        <form>
                            {/* title */}
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <h3 className="breadcrumb-title">{t("text_edit_maintenance")}</h3>
                            </div>
                            <div className="form-group col-md-6 admin-input-spacing">
                                {/* maintenance status */}
                                <div className="row">
                                    <label htmlFor="under_maintenance " className="mb-3 text-white">
                                        {t("text_launchpad_maintenance")}
                                    </label>
                                    <div className="form-group col-md-12 d-flex">
                                        {/* active */}
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
                                                {t("text_active")}
                                            </label>
                                        </div>
                                        {/* deactive */}
                                        <div className="custom-control custom-radio custom-control-inline ms-3">
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
                                                {t("text_deactive")}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Launchpad Maintenance message */}
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
                            <div className="text-center mt-5">
                                {/* update */}
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    {t("text_update")}
                                </button>
                                {/* cancel */}
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
    )
}


// redux connect
const mapStateToProps = (state) => ({
    res: state.setting,
    updateSett: state.updateSetting,
});

export default connect(mapStateToProps)(Maintenance);