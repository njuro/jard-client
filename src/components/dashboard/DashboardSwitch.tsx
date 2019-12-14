import React from "react";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD_URL } from "../../helpers/mappings";
import BoardAdmin from "../board/BoardAdmin";
import UserAdmin from "../user/UserAdmin";

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
      <Route render={() => <div>Hello dashboard</div>} />
    </Switch>
  );
}

export default DashboardSwitch;
