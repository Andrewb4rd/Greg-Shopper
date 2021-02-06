import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NoMatch,
} from "react-router-dom";

import { App, Cart, Orders } from "./components";

let routes = (
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/Cart">
        <Cart />
      </Route>
      <Route path="/Orders">
        <Orders />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById("root"));
