// Redux-Reducer

export const initialState = {
  data: {},
  loading: true,
};

//Reset password data
export function ResetPsdReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

//update password data
export function UpdatePsdReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_PSD_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

//profile update data
export function ProfileUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case "PROFILE_UPDATE_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//password update data
export function PassUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_PSD_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//add new currency data
export function AddCurrReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CURR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//update currency data
export function UpdateCurrReducer(state = initialState, action) {
  switch (action.type) {
    case "EDIT_CURR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

//add new currency pair data
export function AddCurrPairReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CURR_PAIR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//update currency  pair data
export function UpdateCurrPairReducer(state = initialState, action) {
  switch (action.type) {
    case "EDIT_CURR_PAIR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//update currency  pair data
export function CurrReducer(state = initialState, action) {
  switch (action.type) {
    case "CURR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//update currency  id wise
export function GetCurrReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CURR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//update currency  pair data
export function SettingReducer(state = initialState, action) {
  switch (action.type) {
    case "SETTING_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}   //update currency  pair data
export function UpdateSettingReducer(state = initialState, action) {
  switch (action.type) {
    case "EDIT_SETTING_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//delete currency data
export function DeleteCurrReducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE_CURR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}   //delete currency  pair data
export function DeleteCurrPairReducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE_CURR_PAIR_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

//change currency status  data
export function CurrStatusReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_CURR_STATUS":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//change currency  pair status data
export function CurrPairStatusReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_CURR_PAIR_STATUS":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
//member details
export function MemberDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "MEMBER_DETAILS":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}