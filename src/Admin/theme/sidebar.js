import { React, useState } from "react";
import Logo from "../../assets/images/logo_icon.png";
import { NavLink } from "react-router-dom";
import { t } from "i18next";

const Sidebar = () => {
  // manage state
  const [state, setState] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const handleClick = () => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("close");
    setState(!state);
  };

  const handleClick1 = () => {
    setShow(!show)
  };
  const handleClick2 = () => {
    setShow2(!show2)
  };
  const handleClick3 = () => {
    setShow3(!show3)
  };
  const handleClick4 = () => {
    setShow4(!show4)
  };

  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
      let arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("showMenu");
    });
  }

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
          <li className={show ? "showMenu" : ""}>
            <div className="iocn-link">
              <NavLink to="/apu_rate">
                <i className="fa-solid fa-star"></i>
                <span className="link_name">{t("text_masters")}</span>
              </NavLink>
              <i className="fa-solid fa-angle-down arrow" onClick={handleClick1}></i>
            </div>
            <ul className="sub-menu theme-border">
              <li className="showMenu">
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
          <li className={show2 ? "showMenu" : ""}>
            <div className="iocn-link">
              <NavLink to="/member">
                <i className="fa-solid fa-user-group"></i>
                <span className="link_name">{t("text_member")}</span>
              </NavLink>
              <i className="fa-solid fa-angle-down arrow" onClick={handleClick2}></i>
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
          <li className={show3 ? "showMenu" : ""}>
            <div className="iocn-link">
              <NavLink to="/transaction/pending">
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span className="link_name">{t("text_transaction")}</span>
              </NavLink>
              <i className="fa-solid fa-angle-down arrow" onClick={handleClick3}></i>
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
          <li className={show4 ? "showMenu" : ""}>
            <div className="iocn-link">
              <NavLink to="/currency">
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span className="link_name">{t("text_currency")}</span>
              </NavLink>
              <i className="fa-solid fa-angle-down arrow" onClick={handleClick4}></i>
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
