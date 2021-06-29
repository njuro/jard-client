import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import {
  DASHBOARD_MANAGE_ACCOUNT_URL,
  DASHBOARD_MANAGE_BANS_URL,
  DASHBOARD_MANAGE_BOARDS_URL,
  DASHBOARD_MANAGE_USERS_URL,
} from "../../helpers/mappings";
import BoardAdmin from "../board/BoardAdmin";
import UserAdmin from "../user/UserAdmin";
import BanAdmin from "../ban/BanAdmin";
import { AppContext } from "../App";
import ProtectedRoute from "../utils/ProtectedRoute";
import { UserAuthority } from "../../types";
import AccountAdmin from "../user/AccountAdmin";

function DashboardSwitch() {
  const { user } = useContext(AppContext);

  return (
    <Switch>
      <ProtectedRoute
        exact
        path={DASHBOARD_MANAGE_ACCOUNT_URL}
        component={AccountAdmin}
      />
      <ProtectedRoute
        authorities={[UserAuthority.MANAGE_BOARDS]}
        exact
        path={DASHBOARD_MANAGE_BOARDS_URL}
        component={BoardAdmin}
      />
      <ProtectedRoute
        authorities={[UserAuthority.MANAGE_USERS]}
        exact
        path={DASHBOARD_MANAGE_USERS_URL}
        component={UserAdmin}
      />
      <ProtectedRoute
        authorities={[UserAuthority.MANAGE_BANS]}
        exact
        path={DASHBOARD_MANAGE_BANS_URL}
        component={BanAdmin}
      />
      <Route
        render={() => (
          <div>
            Welcome to dashboard, <strong>{user.username}</strong>
          </div>
        )}
      />
    </Switch>
  );
}

export default DashboardSwitch;
