import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { t } from "i18next";

const ProgressBars = () => {
  return (
    <>
      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 column skillbar-col">
        <div className="col-bg">
          <div className="d-flex justify-content-between">
            {/* sub title */}
            <div>
              <h4 className="statistics-title">{t("text_progress_bars")}</h4>
            </div>
            {/* select */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-start"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("text_yearly")}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    {t("text_one")}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {t("text_two")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* progress bars */}
          <div className="progress-col">
            <div className="skillbar" data-percent="55%">
              <div className="skillbar-title">Lorem ipsum dolor</div>
              <div className="skill-bar-percent">&nbsp;&nbsp;&nbsp;51%</div>
              <ProgressBar variant="skillbar-bar skillbar-bar-51" now={51} />
            </div>
            <div className="skillbar" data-percent="80%">
              <div className="skillbar-title">Mauris consectetur</div>
              <div className="skill-bar-percent">&nbsp;&nbsp;&nbsp;20%</div>
              <ProgressBar variant="skillbar-bar skillbar-bar-20" now={20} />
            </div>
            <div className="skillbar" data-percent="40%">
              <div className="skillbar-title">Cras placerat finibus</div>
              <div className="skill-bar-percent">&nbsp;&nbsp;&nbsp;68%</div>
              <ProgressBar variant="skillbar-bar skillbar-bar-68" now={68} />
            </div>
            <div className="skillbar" data-percent="70%">
              <div className="skillbar-title">Vivamus nibh arcu</div>
              <div className="skill-bar-percent">&nbsp;&nbsp;&nbsp;40%</div>
              <ProgressBar variant="skillbar-bar skillbar-bar-40" now={40} />
            </div>
          </div>
          {/* lorem text */}
          <div className="skillbar-title">{t("text_lorem")}</div>
        </div>
      </div>
    </>
  );
};

export default ProgressBars;
