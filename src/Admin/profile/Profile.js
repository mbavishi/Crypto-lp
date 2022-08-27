import React from "react";
import AdminTheme from "../theme/AdminTheme";
import ProfUpdate from "./profUpdate";
import PassUpdate from "./passUpdate";
import { t } from "i18next";

const Profile = () => {
  return (
    <>
      <AdminTheme header={t("text_profile")}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            {/* profile update */}
            <ProfUpdate />
            {/* password update */}
            <PassUpdate />
          </div>
        </div>
      </AdminTheme>
    </>
  );
};

export default Profile;