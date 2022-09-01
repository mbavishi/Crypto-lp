import React from 'react';
import { useNavigate } from "react-router-dom";
import AdminTheme from '../theme/AdminTheme';
import Title from '../../common/title';
import { t } from 'i18next';

const ApuRate = () => {
    const navigate = useNavigate();

    return (
        <>
            <Title props={t("text_apu_rate")} />
            <AdminTheme header={t("text_apu_rate")}>
                <div className='col-6 mx-auto'>
                    <div className="row adminform-row">
                        <form method="post">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <h3 className="breadcrumb-title">{t("text_apu_rate")}</h3>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-white">
                                    APU Rate Minus(%)
                                </label>
                                <input
                                    type="text"
                                    className="form-control theme-input"
                                    id="name"
                                    placeholder="0.1"
                                    name="name"
                                // value={userData.name}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-white">
                                    APU Rate
                                </label>
                                <input
                                    type="text"
                                    className="form-control theme-input"
                                    id="name"
                                    placeholder="0.048"
                                    name="name"
                                // value={userData.name}
                                // onChange={handleChange}
                                />
                            </div> <div className="mb-3">
                                <label htmlFor="name" className="form-label text-white">
                                    APU Rate Plus(%)
                                </label>
                                <input
                                    type="text"
                                    className="form-control theme-input"
                                    id="name"
                                    placeholder="0.1"
                                    name="name"
                                // value={userData.name}
                                // onChange={handleChange}
                                />
                            </div>
                            {/* submit */}
                            <div className="text-center mt-5">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                // onClick={handleSubmit}
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
            </AdminTheme>
        </>
    )
}

export default ApuRate