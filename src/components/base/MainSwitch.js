import React from "react";
import Home from "./Home";
import Board from "../board/Board";
import ThreadWrapper from "../thread/ThreadWrapper";
import LoginForm from "../user/LoginForm";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../utils/NotFound";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";

function MainSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/boards/:label" component={Board} />
      <Route
        exact
        path="/boards/:label/:threadNumber"
        component={ThreadWrapper}
      />
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default MainSwitch;
