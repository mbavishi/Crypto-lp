import React from "react";
import { t } from "i18next";

const Footer = () => {
  return (
    <>
      {/* copyright text */}
      <div className="row copy-right-row">
        <div className="col-md-12 copyright text-center dashboard-copyright">
          <p>{t("text_copyright")}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
