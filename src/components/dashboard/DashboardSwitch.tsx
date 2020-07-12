import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD_URL } from "../../helpers/mappings";
import BoardAdmin from "../board/BoardAdmin";
import UserAdmin from "../user/UserAdmin";
import BanAdmin from "../ban/BanAdmin";
import { AuthContext } from "../App";
import ProtectedRoute from "../utils/ProtectedRoute";
import { UserAuthority } from "../../types";

function DashboardSwitch() {
  const { user } = useContext(AuthContext);
  return (
    <Switch>
      <ProtectedRoute
        authorities={[UserAuthority.MANAGE_BOARDS]}
        exact
        path={`${DASHBOARD_URL}/manage-boards`}
        component={BoardAdmin}
      />
      <ProtectedRoute
        authorities={[UserAuthority.MANAGE_USERS]}
        exact
        path={`${DASHBOARD_URL}/manage-users`}
        component={UserAdmin}
      />
      <ProtectedRoute
        authorities={[UserAuthority.MANAGE_BANS]}
        exact
        path={`${DASHBOARD_URL}/manage-bans`}
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
