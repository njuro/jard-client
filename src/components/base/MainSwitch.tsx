import React from "react";
import { Route, Switch } from "react-router-dom";
import Board from "../board/Board";
import Dashboard from "../dashboard/Dashboard";
import ThreadWrapper from "../thread/ThreadWrapper";
import LoginForm from "../user/LoginForm";
import NotFound from "../utils/NotFound";
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "./Home";

function MainSwitch() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/boards/:label" component={Board} />
      <Route
        exact={true}
        path="/boards/:label/:threadNumber"
        component={ThreadWrapper}
      />
      <Route exact={true} path="/login" component={LoginForm} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default MainSwitch;
