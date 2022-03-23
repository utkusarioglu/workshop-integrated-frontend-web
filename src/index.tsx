import ReactDOM from "react-dom";
import React from "react";
import AppView from "_views/app/App.view";
import { HooksManager } from "hooks";

HooksManager.setCouplings({ react: React });

ReactDOM.render(<AppView />, document.getElementById("root"));
