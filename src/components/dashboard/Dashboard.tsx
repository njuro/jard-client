import React from "react";
import { Grid } from "semantic-ui-react";
import DashboardMenu from "./DashboardMenu";
import DashboardSwitch from "./DashboardSwitch";

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
