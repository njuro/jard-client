import React from "react";
import { Route, Switch } from "react-router-dom";
import Board from "../board/Board";
import BoardCatalog from "../board/BoardCatalog";
import Dashboard from "../dashboard/Dashboard";
import ThreadWrapper from "../thread/ThreadWrapper";
import LoginForm from "../user/LoginForm";
import NotFound from "../utils/NotFound";
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "./Home";
import BanStatus from "../ban/BanStatus";

function MainSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/boards/:label/catalog" component={BoardCatalog} />
      <Route exact path="/boards/:label/:page?" component={Board} />
      <Route
        exact
        path="/boards/:label/thread/:threadNumber"
        component={ThreadWrapper}
      />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/banned" component={BanStatus} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default MainSwitch;
