// Redux-Reducer

export const initialState = {
  data: {},
  loading: true,
};

// Wallet connect 
export function userWalletConnReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_WALLET_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

// from currency data
export function currencyFromReducer(state = initialState, action) {
  switch (action.type) {
    case "FROM_CURRENCY_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

// to currency data
export function currencyToReducer(state = initialState, action) {
  switch (action.type) {
    case "TO_CURRENCY_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}

// transaction data
export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TRANSACTION_DATA":
      return { data: action.payload, loading: false };
    default:
      return state;
  }
}
