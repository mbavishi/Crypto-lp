import { combineReducers } from "redux";
import { currencyFromReducer, currencyToReducer, transactionReducer, userWalletConnReducer } from "./Reducer/FetchReducer";
import {
    DefaultLoginReducer,
    AddCurrPairReducer,
    AddCurrReducer,
    CurrPairStatusReducer,
    GetCurrReducer,
    CurrReducer,
    CurrStatusReducer,
    DeleteCurrPairReducer,
    DeleteCurrReducer,
    PassUpdateReducer,
    ProfileUpdateReducer,
    ResetPsdReducer,
    SettingDataReducer,
    SettingReducer,
    MemberDetailsReducer,
    UpdateCurrPairReducer, UpdateCurrReducer, UpdatePsdReducer, UpdateSettingReducer
} from "./Reducer/AdminReducer";


const rootReducer = combineReducers({
    DefaultLogin: DefaultLoginReducer,
    userWallet: userWalletConnReducer,
    fromCurr: currencyFromReducer,
    toCurr: currencyToReducer,
    transaction: transactionReducer,
    resetPsd: ResetPsdReducer,
    updatePsd: UpdatePsdReducer,
    profileupdate: ProfileUpdateReducer,
    passUpdate: PassUpdateReducer,
    addCurr: AddCurrReducer,
    GetCurr: GetCurrReducer,
    updateCurr: UpdateCurrReducer,
    addCurrPair: AddCurrPairReducer,
    updateCurrPair: UpdateCurrPairReducer,
    curr: CurrReducer,
    SettingData: SettingDataReducer,
    setting: SettingReducer,
    updateSetting: UpdateSettingReducer,
    deleteCurr: DeleteCurrReducer,
    deleteCurrPair: DeleteCurrPairReducer,
    changeStatus: CurrStatusReducer,
    changePairStatus: CurrPairStatusReducer,
    MemberDetails: MemberDetailsReducer
})
export default rootReducer;
