import React from "react";
import { toast } from "react-toastify";
import Admin from "../../assets/images/admin.png";
import { NavLink, useNavigate } from "react-router-dom";
import { t } from "i18next";

const Header = () => {
  const navigate = useNavigate()

  const AdminLogout = () => {
    sessionStorage.clear();
    navigate("/admin");
    toast.success("Logout Successfully");
  }

  return (
    <>
      <div className="header datatable-header">
        <div className="sidebar-button">
          <i className="bx bx-menu sidebarBtn"></i>
        </div>
        {/* search bar */}
        <form className="d-flex dashboard-search ms-5">
          <input
            type="search"
            className="form-control theme-input"
            placeholder="Type something..."
            aria-label="Recipient's search"
            aria-describedby="search"
            required=""
          />
          <span className="input-group-icon theme-input" id="search">
            <i className="fa-solid fa fa-magnifying-glass fa-search"></i>
          </span>
        </form>
        {/* bell notification */}
        <div className="bell">
          <span></span>
          <i className="fa-solid fa fa-bell notification-icon"></i>
        </div>
        {/* dropdown */}
        <div className="profile-details position-absolute">
          <a href="#"
          >
            <img
              src={Admin}
              alt="logo"
              className="img-fluid"
              width="54"
              height="82"
            />
          </a>
          <span className="admin-name">{t("text_admin")}</span>
          <i className="fa-solid fa-angle-down nav-downicon"></i>
          <div className="profile-icon">
            <ul>
              {/* profile */}
              <li>
                <NavLink to="/profile">
                  <i className="feather icon-settings"></i>
                  {t("text_profile")}
                </NavLink>
              </li>
              {/* logout */}
              <li>
                <div onClick={AdminLogout} className="pointer logout">
                  <i className="feather icon-mail"></i>
                  {t("text_logout")}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div >
    </>
  );
};

export default Header;