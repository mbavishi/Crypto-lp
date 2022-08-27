import Login from "../Admin/Login/Login";
import Private from "../Routes/privateRoutes/adminPrivateRoutes"
import Profile from "../Admin/profile/Profile";
import UpdatePassword from "../Admin/Login/UpdatePassword";
import Dashboard from "../Admin/dashboard/dashboard";
import AddCurrency from "../Admin/Currency/AddCurrency";
import EditCurrency from "../Admin/Currency/EditCurrency";
import AddCurrencyPair from "../Admin/CurrencyPair/AddCurrencyPair";
import EditCurrencyPair from "../Admin/CurrencyPair/EditCurrencyPair ";
import UpdateSetting from "../Admin/Setting/UpdateSetting";
import ApuRate from "../Admin/masters/apuRate";
import Maintenance from "../Admin/Maintenance/maintenance";
import AllDeposite from "../Admin/Deposite/allDeposite";
import Member from "../Admin/member/member";
import MemberDetail from "../Admin/member/memberDetail";
import WalletUpdate from "../Admin/member/walletUpdate";
import Transaction from "../Admin/Deposite/transaction";
import Currency from "../Admin/Currency/currency";


const AdminRoutes = [
  { path: "/admin", component: <Login /> },
  { path: "/updatepsd", component: <Private><UpdatePassword /></Private> },
  { path: "/profile", component: <Private><Profile /></Private> },
  { path: "/currency/add", component: <Private><AddCurrency /></Private> },
  { path: "/currency/edit", component: <Private><EditCurrency /></Private> },
  { path: "/currPair/add", component: <Private><AddCurrencyPair /></Private> },
  { path: "/currPair/edit", component: <Private><EditCurrencyPair /></Private> },
  { path: "/setting", component: <Private><UpdateSetting /></Private> },
  { path: "/dashboard", component: <Private><Dashboard /></Private> },
  { path: "/apu_rate", component: <Private><ApuRate /></Private> },
  { path: "/maintenance", component: <Private><Maintenance /></Private> },
  { path: "/all_deposite", component: <Private><AllDeposite /></Private> },
  { path: "/member", component: <Private><Member /></Private> },
  { path: "/member/view/:id", component: <Private><MemberDetail /></Private> },
  { path: "/member/wallet_update", component: <Private><WalletUpdate /></Private> },
  { path: "/transaction/pending", component: <Private><Transaction /></Private> },
  { path: "/transaction/approved", component: <Private><Transaction /></Private> },
  { path: "/transaction/failed", component: <Private><Transaction /></Private> },
  { path: "/currency", component: <Private><Currency /></Private> }
];

export default AdminRoutes;
