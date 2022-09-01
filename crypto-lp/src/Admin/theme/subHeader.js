import React from "react";

const SubHeader = ({ props }) => {
  return (
    <>
      {/* subheader */}
      <div className="row main-title">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h3>{props}</h3>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
