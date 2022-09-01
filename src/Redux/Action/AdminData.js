import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//connection successfully notify
const notifyMess = (data) => {
  if (data.status === true) {
    toast.success(data.message);
  }
  else {
    toast.error(data.message)
    console.log(data.message);
  }
};

// reset password
export function ResetPsd(data) {
  return async (dispatch) => {
    var response = await fetch("/api/sendotp", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "RESET_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// update password
export function updatePsd(data) {
  return async (dispatch) => {
    var response = await fetch("/api/pass_update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "UPDATE_PSD_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// admin profile update
export function ProfileUpdate(data, id) {
  return async (dispatch) => {
    var response = await fetch(`/api/update_profile/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "PROFILE_UPDATE_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// admin password update
export function PassUpdate(data, id) {
  return async (dispatch) => {
    var response = await fetch(`/api/change_pass/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "CHANGE_PSD_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// add new currency
export function AddCurrencyData(data) {
  return async (dispatch) => {
    var response = await fetch(`/api/add_currency_data`, {
      method: "POST",
      body: data,
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "ADD_CURR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// edit currency
export function EditCurrencyData(data, id) {
  return async (dispatch) => {
    var response = await fetch(`/api/edit_currency_data/${id}`, {
      method: "POST",
      body: data,
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "EDIT_CURR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// add new currency pair
export function AddCurrencyPairData(data) {
  return async (dispatch) => {
    var response = await fetch(`/api/add_currency_pair`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "ADD_CURR_PAIR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// edit currency pair
export function EditCurrencyPairData(data, id) {
  return async (dispatch) => {
    var response = await fetch(`/api/edit_currency_pair/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "EDIT_CURR_PAIR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// get currency data
export function CurrencyData() {
  return async (dispatch) => {
    var response = await fetch(`/api/all_currency`);
    var res_data = await response.json();
    var return_response = {
      type: "CURR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

//  setting data
export function DefaultLogin() {
  return async (dispatch) => {
    var response = await fetch(`/api/default_login`);
    var res_data = await response.json();
    console.log(res_data);
    var return_response = {
      type: "DEFAULT_LOGIN",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

//  setting data
export function SettingData() {
  return async (dispatch) => {
    var response = await fetch(`/api/setting_data`);
    var res_data = await response.json();
    var return_response = {
      type: "SETTING",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// get setting data
export function GetSettingData() {
  return async (dispatch) => {
    var response = await fetch(`/api/get_settings`);
    var res_data = await response.json();
    var return_response = {
      type: "SETTING_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// update setting data
export function UpdateSettingData(data) {
  return async (dispatch) => {
    var response = await fetch(`/api/update_settings_data`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    notifyMess(res_data);
    var return_response = {
      type: "EDIT_SETTING_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// get currency id wise
export function GetCurrencyData(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/get_insert_curr_data/${id}`);
    var res_data = await response.json();
    var return_response = {
      type: "GET_CURR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// delete currency data
export function DeleteCurrencyData(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/delete_currency_data/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    var res_data = await response.json();
    var return_response = {
      type: "DELETE_CURR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// delete currency data
export function DeleteCurrencyPairData(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/delete_currency_pair/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    var res_data = await response.json();
    var return_response = {
      type: "DELETE_CURR_PAIR_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// change currency status
export function ChangeCurrStatusData(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/change_currency_status/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    var res_data = await response.json();
    var return_response = {
      type: "CHANGE_CURR_STATUS",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// delete currency data
export function ChangeCurrPairStatusData(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/change_curr_pair_status/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    var res_data = await response.json();
    var return_response = {
      type: "CHANGE_CURR_PAIR_STATUS",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// member details
export function MemberDetails(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/view_mem_data/${id}`);
    var res_data = await response.json();
    var return_response = {
      type: "MEMBER_DETAILS",
      payload: res_data,
    };
    dispatch(return_response);
  };
}