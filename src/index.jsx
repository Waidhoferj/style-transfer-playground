import React from "react";
import ReactDOM from "react-dom";

import StyleTransfer from "./pages/StyleTransfer/StyleTransfer";

import "./index.scss";

const App = function () {
  return <StyleTransfer />;
};

const view = App("pywebview");

const element = document.getElementById("app");
ReactDOM.render(view, element);
