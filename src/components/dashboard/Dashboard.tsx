import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import DashboardMenu from "./DashboardMenu";
import DashboardSwitch from "./DashboardSwitch";
import { AppContext } from "../App";
import { MENU_ITEM_DASHBOARD } from "../base/MainMenu";

function Dashboard() {
  const { setActiveMenuItem } = useContext(AppContext);

  useEffect(() => {
    setActiveMenuItem(MENU_ITEM_DASHBOARD);
  });

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
