import { React, useEffect } from "react";
import { SettingData } from "../../Redux/Action/AdminData";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const UserTheme = ({ dispatch, res, children }) => {
  useEffect(() => {
    dispatch(SettingData());
  }, [dispatch]);
  const data = res.data;
  const logo = data.company_logo;

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
        <div className="col-md-10 mx-auto">
          {children}
        </div>
      </div>
    </>
  );
};

// redux connect
const mapStateToProps = (state) => ({
  res: state.SettingData,
});

export default connect(mapStateToProps)(UserTheme);