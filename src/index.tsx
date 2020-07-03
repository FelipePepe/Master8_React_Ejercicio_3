import React from "react";
import ReactDom from "react-dom";
import { ListEmployees } from "./listEmployees";

ReactDom.render(
  <div>
    <ListEmployees />
  </div>,
  document.getElementById("root")
);
