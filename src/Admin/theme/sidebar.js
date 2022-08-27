import { React, useState } from "react";
import Logo from "../../assets/images/logo_icon.png";
import { NavLink } from "react-router-dom";
import { t } from "i18next";

const Sidebar = () => {
  // manage state
  const [state, setState] = useState(false);

  const handleClick = () => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("close");
    setState(!state);
  };

  return (
    <>
      <div className="sidebar close">
        {/* logo */}
        <div className="logo-details">
          <NavLink to="/">
            <img
              src={Logo}
              alt="logo"
              className="img-fluid"
              width="40"
              height="40"
            />
          </NavLink>
        </div>
        <ul className="nav-links">
          {/* dashboard */}
          <li>
            <NavLink to="/dashboard">
              <i className="fa-solid fa-chart-area"></i>
              <span className="link_name">{t("text_dashboard")}</span>
            </NavLink>
            <ul className="sub-menu blank">
              <li>
                <NavLink className="link_name" to="/dashboard">
                  {t("text_dashboard")}
                </NavLink>
              </li>
            </ul>
          </li>
          {/* setting */}
          <li>
            <div className="iocn-link">
              <NavLink to="/setting">
                <i className="fa-solid fa-gear"></i>
                <span className="link_name">{t("text_setting")}</span>
              </NavLink>
            </div>
            <ul className="sub-menu blank">
              <li>
                <NavLink className="link_name" to="/setting">
                  {t("text_setting")}
                </NavLink>
              </li>
            </ul>
          </li>
          {/* masters */}
          <li>
            <div className="iocn-link">
              <NavLink to="/apu_rate">
                <i className="fa-solid fa-star"></i>
                <span className="link_name">{t("text_masters")}</span>
                {/* <i className="fa-solid fa-angle-down arrow"></i> */}
              </NavLink>
            </div>
            <ul className="sub-menu theme-border">
              <li>
                <a className="link_name">
                  {t("text_masters")}
                </a>
              </li>
              <li>
                <NavLink to="/apu_rate">{t("text_APU_rate")}</NavLink>
              </li>
            </ul>
          </li>
          {/* Member */}
          <li>
            <div className="iocn-link">
              <NavLink to="/member">
                <i className="fa-solid fa-user-group"></i>
                <span className="link_name">{t("text_member")}</span>
                {/* <i className="fa-solid fa-angle-down arrow"></i> */}
              </NavLink>
            </div>
            <ul className="sub-menu theme-border">
              <li>
                <a className="link_name">
                  {t("text_member")}
                </a>
              </li>
              <li>
                <NavLink to="/member">
                  {t("text_member")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/member/wallet_update">
                  {t("text_wallet_transaction_history")}
                </NavLink>
              </li>
            </ul>
          </li>
          {/* Transaction */}
          <li>
            <div className="iocn-link">
              <NavLink to="/transaction/pending">
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span className="link_name">{t("text_transaction")}</span>
                {/* <i className="fa-solid fa-angle-down arrow"></i> */}
              </NavLink>
            </div>
            <ul className="sub-menu theme-border">
              <li>
                <a className="link_name">
                  {t("text_transaction")}
                </a>
              </li>
              <li>
                <NavLink to="/transaction/pending">{t("text_pending")}</NavLink>
              </li>
              <li>
                <NavLink to="/transaction/approved">{t("text_approved")}</NavLink>
              </li>
              <li>
                <NavLink to="/transaction/failed">{t("text_failed")}</NavLink>
              </li>
            </ul>
          </li>
          {/* All Deposite */}
          <li>
            <NavLink to="/all_deposite">
              <i className="fa-solid fa-coins"></i>
              <span className="link_name">{t("text_all_deposite")}</span>
            </NavLink>
            <ul className="sub-menu blank">
              <li>
                <NavLink className="link_name" to="/all_deposite">
                  {t("text_all_deposite")}
                </NavLink>
              </li>
            </ul>
          </li>
          {/* maintenance */}
          <li>
            <NavLink to="/maintenance">
              <i className="fa-solid fa-coins"></i>
              <span className="link_name">{t("text_maintenance")}</span>
            </NavLink>
            <ul className="sub-menu blank">
              <li>
                <NavLink className="link_name" to="/maintenance">
                  {t("text_maintenance")}
                </NavLink>
              </li>
            </ul>
          </li>
          {/* currency */}
          <li>
            <div className="iocn-link">
              <NavLink to="/currency">
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span className="link_name">{t("text_currency")}</span>
                {/* <i className="fa-solid fa-angle-down arrow"></i> */}
              </NavLink>
            </div>
            <ul className="sub-menu theme-border">
              <li>
                <a className="link_name">
                  {t("text_currency")}
                </a>
              </li>
              <li>
                <NavLink to="/currency">
                  {t("text_currency")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/currPair/add">
                  {t("text_currency_pair")}
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div >
      {/* sidebar toggle */}
      <section className="custom-section">
        <div className="custom-content" onClick={handleClick}>
          {state ? (
            <i className={`fa-solid fa-xmark bx-menu`} id="bx-menu"></i>
          ) : (
            <i className={`fa-solid fa-bars bx-menu`} id="bx-menu"></i>
          )}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
