import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./utils/serviceWorker";

// Styles
import "./styles/index.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// Disable service workers
serviceWorker.unregister();
