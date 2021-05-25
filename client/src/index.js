import React from "react";
import ReactDOM from "react-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import "./index.scss";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { GlobalProvider } from "./context/globalContext";

require("dotenv").config({ path: "../../.env" });

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
