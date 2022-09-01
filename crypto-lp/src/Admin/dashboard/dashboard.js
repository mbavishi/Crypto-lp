import React from "react";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import DbPart1 from "./dbPart1";
import CryptoStatistics from "./cryptoStatistics";
import WalletBalance from "./walletBalance";
import BarChart from "./barChart";
import ProgressBars from "./progressBar";
import QuickConversion from "./quickConversion";
import QuickTrade from "./quickTrade";
import TransactionHistory from "./transactionHistory";
import CryptoMarketingValues from "./cryptoMarketingValues";
import { t } from "i18next";

const Dashboard = () => {
  return (
    <>
      <Title props={t("text_dashboard")} />
      <AdminTheme header={t("text_dashboard")}>
        {/* part 1 */}
        <DbPart1 />
        {/* part 2 */}
        <div className="row statistics-row">
          <CryptoStatistics />
          <WalletBalance />
        </div>
        {/* part 3 */}
        <div className="row statistics-row">
          <BarChart />
          <ProgressBars />
        </div>
        {/* part 4 */}
        <div className="row statistics-row margin-top">
          <QuickConversion />
          <QuickTrade />
        </div>
        {/* part 5 */}
        <div className="row statistics-row margin-top">
          <TransactionHistory />
          <CryptoMarketingValues />
        </div>
      </AdminTheme>
    </>
  );
};

export default Dashboard;
