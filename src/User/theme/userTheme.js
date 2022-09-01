import { React, useEffect } from "react";
import { GetSettingData } from "../../Redux/Action/AdminData";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const UserTheme = ({ dispatch, res, children }) => {
  useEffect(() => {
    dispatch(GetSettingData());
  }, [dispatch]);
  const data = res.data;
  const logo = data.config_table && data.config_table[11].lp_settings_value;

  return (
    <>
      {/* logo */}
      <section className="logo-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-left mt-5 text-md-center center-text logo-spacing">
              <NavLink to="/">
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid"
                  width="165"
                  height="36"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      {/* main-part */}
      <div className="row">
        <div className="col-md-10 mx-auto mt-3">
          {children}
        </div>
      </div>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.setting,
});

export default connect(mapStateToProps)(UserTheme);
