import { combineReducers } from "redux";
import { currencyFromReducer, currencyToReducer, transactionReducer, userWalletConnReducer } from "./Reducer/FetchReducer";
import {
    AddCurrPairReducer,
    AddCurrReducer,
    CurrPairStatusReducer,
    CurrReducer,
    CurrStatusReducer,
    DeleteCurrPairReducer,
    DeleteCurrReducer,
    PassUpdateReducer,
    ProfileUpdateReducer,
    ResetPsdReducer,
    SettingReducer,
    MemberDetailsReducer,
    UpdateCurrPairReducer, UpdateCurrReducer, UpdatePsdReducer, UpdateSettingReducer
} from "./Reducer/AdminReducer";


const rootReducer = combineReducers({
    userWallet: userWalletConnReducer,
    fromCurr: currencyFromReducer,
    toCurr: currencyToReducer,
    transaction: transactionReducer,
    resetPsd: ResetPsdReducer,
    updatePsd: UpdatePsdReducer,
    profileupdate: ProfileUpdateReducer,
    passUpdate: PassUpdateReducer,
    addCurr: AddCurrReducer,
    updateCurr: UpdateCurrReducer,
    addCurrPair: AddCurrPairReducer,
    updateCurrPair: UpdateCurrPairReducer,
    curr: CurrReducer,
    setting: SettingReducer,
    updateSetting: UpdateSettingReducer,
    deleteCurr: DeleteCurrReducer,
    deleteCurrPair: DeleteCurrPairReducer,
    changeStatus: CurrStatusReducer,
    changePairStatus: CurrPairStatusReducer,
    MemberDetails: MemberDetailsReducer
})
export default rootReducer;
