import React from "react";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD_URL } from "../../helpers/mappings";
import BoardAdmin from "../board/BoardAdmin";
import UserAdmin from "../user/UserAdmin";
import BanAdmin from "../ban/BanAdmin";

function DashboardSwitch() {
  return (
    <Switch>
      <Route
        exact
        path={`${DASHBOARD_URL}/manage-boards`}
        component={BoardAdmin}
      />
      <Route
        exact
        path={`${DASHBOARD_URL}/manage-users`}
        component={UserAdmin}
      />
      <Route exact path={`${DASHBOARD_URL}/manage-bans`} component={BanAdmin} />
      <Route render={() => <div>Hello dashboard</div>} />
    </Switch>
  );
}

export default DashboardSwitch;
