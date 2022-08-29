import { React } from 'react';
import TranHistory from './memberDetail/tranHistory';
import AdminTheme from '../theme/AdminTheme';
import View from './memberDetail/view';
import { t } from 'i18next';

const MemberDetail = () => {
    return (
        <>
            <AdminTheme header={t("text_member")}>
                <View />
                <TranHistory />
            </AdminTheme>
        </>
    )
}

export default MemberDetail;