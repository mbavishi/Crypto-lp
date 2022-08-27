import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { t } from "i18next";

const Title = ({ props }) => {
  return (
    <>
      {/* title for window tab */}
      <HelmetProvider>
        <Helmet>
          <title>
            {/* passing props */}
            {props} | {t("text_launchpad")}
          </title>
        </Helmet>
      </HelmetProvider>
    </>
  );
};

export default Title;
