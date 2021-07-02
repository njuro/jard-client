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
import {
  BAN_STATUS_URL,
  BOARD_CATALOG_ROUTE,
  BOARD_ROUTE,
  DASHBOARD_URL,
  FORGOT_PASSWORD_URL,
  HOME_URL,
  LOGIN_URL,
  SEARCH_ROUTE,
  THREAD_ROUTE,
} from "../../helpers/mappings";
import PostSearch from "../post/PostSearch";
import ForgotPasswordForm from "../user/ForgotPasswordForm";

function MainSwitch() {
  return (
    <Switch>
      <Route exact path={HOME_URL} component={Home} />
      <Route exact path={BOARD_CATALOG_ROUTE} component={BoardCatalog} />
      <Route exact path={BOARD_ROUTE} component={Board} />
      <Route exact path={THREAD_ROUTE} component={ThreadWrapper} />
      <Route exact path={LOGIN_URL} component={LoginForm} />
      <Route exact path={BAN_STATUS_URL} component={BanStatus} />
      <Route exact path={SEARCH_ROUTE} component={PostSearch} />
      <Route exact path={FORGOT_PASSWORD_URL} component={ForgotPasswordForm} />
      <ProtectedRoute path={DASHBOARD_URL} component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default MainSwitch;
