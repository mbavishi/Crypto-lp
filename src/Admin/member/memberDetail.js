import { React, useEffect } from 'react';
import { MemberDetails } from "../../Redux/Action/AdminData";
import TranHistory from './memberDetail/tranHistory';
import { useParams } from 'react-router-dom';
import AdminTheme from '../theme/AdminTheme';
import View from './memberDetail/view';
import { connect } from "react-redux";
import { t } from 'i18next';

const MemberDetail = ({ dispatch, res }) => {
    const params = useParams()

    useEffect(() => {
        dispatch(MemberDetails(params.id));
    }, [dispatch, params.id]);
    const data = res.data;

    return (
        <>
            <AdminTheme header={t("text_member")}>
                <View />
                <TranHistory />
            </AdminTheme>
        </>
    )
}

// redux connect
const mapStateToProps = (state) => ({
    res: state.MemberDetails,
});

export default connect(mapStateToProps)(MemberDetail);