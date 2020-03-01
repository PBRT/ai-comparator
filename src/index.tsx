import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Local components and utils
import App from "./app/App";
import configureStore from "./redux/store";
import * as serviceWorker from "./utils/serviceWorker";

// Styles
import "./styles/index.css";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// Disable service workers
serviceWorker.unregister();
