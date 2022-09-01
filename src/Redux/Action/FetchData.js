import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//connection successfully notify
const notify = (data) => {
  if (data.status === true) {
    toast.success(data.title);
  } else {
    toast.error(data.title);
  }
};

const notifyMess = (data) => {
  if (data.status === true) {
    toast.success(data.message);
  } else {
    toast.error(data.message);
  }
};

// user wallet connection
export function userWalletConn(id) {
  return async (dispatch) => {
    var data = {
      wallet_address: id,
    };
    var response = await fetch("/api/user_wallet_conn", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    if (res_data) {
      notify(res_data);
    }
    var return_response = {
      type: "USER_WALLET_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// user wallet connection
export function fromCurrency() {
  return async (dispatch) => {
    var response = await fetch("/api/all_from_currency");
    var res_data = await response.json();
    var return_response = {
      type: "FROM_CURRENCY_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// user wallet connection
export function toCurrency(id) {
  return async (dispatch) => {
    var response = await fetch(`/api/all_to_currency/${id}`);
    var res_data = await response.json();
    var return_response = {
      type: "TO_CURRENCY_DATA",
      payload: res_data,
    };
    dispatch(return_response);
  };
}

// transaction
export function AddTransaction(data) {
  return async (dispatch) => {
    var response = await fetch("/api/add_transaction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var res_data = await response.json();
    if (res_data) {
      notifyMess(res_data);
    }
    var return_response = {
      type: "CHANGE_CURR_PAIR_STATUS",
      payload: res_data,
    };
    dispatch(return_response);
  };
}
