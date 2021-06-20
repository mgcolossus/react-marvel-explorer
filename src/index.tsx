import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RootStoreProvider } from "./stores";

ReactDOM.render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>,
  document.getElementById("root")
);
