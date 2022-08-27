import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/Lunchpad Logo.png";

const UserTheme = (props) => {
  return (
    <>
      {/* logo */}
      <section className="logo-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-left mt-5 text-md-center center-text logo-spacing">
              <NavLink to="/">
                <img
                  src={Logo}
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
      {props.header ? (
        <div className="row">
          <div className="col-md-10 mx-auto mt-3">
            <div className="row main-title">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h3>{props.header}</h3>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default UserTheme;
