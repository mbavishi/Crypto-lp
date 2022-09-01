import { React, useEffect } from "react";
import { GetSettingData } from "../../Redux/Action/AdminData";
import HtmlReactParser from "html-react-parser"
import { connect } from "react-redux";

const Footer = ({ dispatch, res }) => {
  //get the setting data on page load
  useEffect(() => {
    dispatch(GetSettingData());
  }, [dispatch]);
  const data = res.data;

  return (
    <>
      {/* copyright text */}
      <div className="row copy-right-row">
        <div className="col-md-12 copyright text-center dashboard-copyright">
          {data.config_table && HtmlReactParser(data.config_table[10].lp_settings_value)}
        </div>
      </div>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.setting,
});

export default connect(mapStateToProps)(Footer);