import { React, useEffect } from 'react';
import { MemberDetails } from "../../../Redux/Action/AdminData";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { t } from 'i18next';

const View = ({ dispatch, res }) => {
    const params = useParams()

    useEffect(() => {
        dispatch(MemberDetails(params.id));
    }, [dispatch, params.id]);
    const data = res.data;

    return (
        <>
            {res.loading ? (
                <div className="d-flex text-center justify-content-center mt-10">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <div className="row adminform-row">
                    <form method="post">
                        {/* title */}
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h3 className="breadcrumb-title">{t("text_view_member")}</h3>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {/* user-id */}
                                <div className="mb-3 mt-3">
                                    <label htmlFor="userid" className="form-label text-white">
                                        {t("text_user_id")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control theme-input"
                                        id="userid"
                                        placeholder="Enter smtp host"
                                        name="userid"
                                        value={data.users[0].user_id}
                                        readOnly={true}
                                    />
                                </div>
                                {/* status */}
                                <div className="mb-3 mt-3">
                                    <label htmlFor="status" className="form-label text-white">
                                        {t("text_status")}
                                    </label>
                                    <div>
                                        {data.users[0].status == 1 ?
                                            <span class='btn btn-primary active-btn'>{t("text_active")}</span> :
                                            <span class='btn btn-primary inactive-btn'>{t("text_deactive")}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                {/* wallet address */}
                                <div className="mb-3 mt-3">
                                    <label htmlFor="address" className="form-label text-white">
                                        {t("text_wallet_address")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control theme-input"
                                        id="address"
                                        placeholder="Enter smtp host"
                                        name="address"
                                        value={data.users[0].wallet_address}
                                        readOnly={true}
                                    />
                                </div>
                                {/* join date */}
                                <div className="mb-3 mt-3">
                                    <label htmlFor="date" className="form-label text-white">
                                        {t("text_join_date")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control theme-input"
                                        id="date"
                                        placeholder="Enter smtp host"
                                        name="date"
                                        value={data.users[0].created_at}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

// redux connect
const mapStateToProps = (state) => ({
    res: state.MemberDetails,
});

export default connect(mapStateToProps)(View);