import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Local components and utils
import { AppWithRouter } from "./app/App";
import * as serviceWorker from "./utils/serviceWorker";

// Styles
import "./styles/index.css";

ReactDOM.render(
  <BrowserRouter>
    <AppWithRouter />
  </BrowserRouter>,
  document.getElementById("root")
);

// Disable service workers
serviceWorker.unregister();
