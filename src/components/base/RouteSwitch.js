import React from "react";
import Home from "./Home";
import Board from "../board/Board";
import ThreadWrapper from "../thread/ThreadWrapper";
import Login from "../user/Login";
import Dashboard from "../user/auth/Dashboard";
import NotFound from "../utils/NotFound";
import { Route, Switch } from "react-router-dom";

function RouteSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/boards/:label" component={Board} />
      <Route
        exact
        path="/boards/:label/:threadNumber"
        component={ThreadWrapper}
      />
      <Route exact path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default RouteSwitch;
