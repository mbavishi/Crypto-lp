import React from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import { Web3ReactProvider } from "@web3-react/core";
import { createStore, applyMiddleware } from "redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./common/ErrorHandler";
import reportWebVitals from "./reportWebVitals";
import Spinner from "react-bootstrap/Spinner";
import rootReducer from "./Redux/index";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./languages/i18n";

const App = React.lazy(() => import("./App"));
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        {/* Show a spinner while the app [data fetching] is loading */}
        <Web3ReactProvider>
          <React.Suspense fallback={<Spinner />}>
            <App />
          </React.Suspense>
        </Web3ReactProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
