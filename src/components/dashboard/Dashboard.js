import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Grid, Menu } from "semantic-ui-react";
import { DASHBOARD_URL } from "../../helpers/mappings";
import { Link, Route, Switch } from "react-router-dom";
import BoardForm from "../board/BoardForm";
import Register from "../user/Register";
import DashboardSwitch from "./DashboardSwitch";
import DashboardMenu from "./DashboardMenu";

function Dashboard() {
  return (
    <Grid columns={2}>
      <Grid.Column width={4}>
        <DashboardMenu />
      </Grid.Column>
      <Grid.Column width={12}>
        <DashboardSwitch />
      </Grid.Column>
    </Grid>
  );
}

export default Dashboard;
