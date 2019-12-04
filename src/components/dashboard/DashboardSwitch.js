import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD_URL } from "../../helpers/mappings";
import BoardForm from "../board/BoardForm";
import Register from "../user/Register";
import { AuthContext } from "../App";
import BoardAdmin from "../board/BoardAdmin";

function DashboardSwitch(props) {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      <Route
        exact
        path={`${DASHBOARD_URL}/manage-boards`}
        component={BoardAdmin}
      />
      <Route exact path={`${DASHBOARD_URL}/create-user`} component={Register} />
      <Route render={() => <div>Hello dashboard</div>} />
    </Switch>
  );
}

export default DashboardSwitch;
