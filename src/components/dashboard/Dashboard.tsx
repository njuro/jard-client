import React, { createContext, useContext, useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import DashboardMenu, { DASHBOARD_ITEM_HOME } from "./DashboardMenu";
import DashboardSwitch from "./DashboardSwitch";
import { AppContext } from "../App";
import { MENU_ITEM_DASHBOARD } from "../base/MainMenu";
import { SetStateType } from "../../types";

interface DashboardContextProps {
  activeDashboardItem?: string;
  setActiveDashboardItem: SetStateType<string | undefined>;
}
export const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
);
function Dashboard() {
  const { setActiveMenuItem } = useContext(AppContext);

  const [activeDashboardItem, setActiveDashboardItem] = useState<string>();

  useEffect(() => {
    setActiveMenuItem(MENU_ITEM_DASHBOARD);
    setActiveDashboardItem(DASHBOARD_ITEM_HOME);
  }, [setActiveMenuItem, setActiveDashboardItem]);

  return (
    <DashboardContext.Provider
      value={{ activeDashboardItem, setActiveDashboardItem }}
    >
      <Grid columns={2}>
        <Grid.Column width={4}>
          <DashboardMenu />
        </Grid.Column>
        <Grid.Column width={12}>
          <DashboardSwitch />
        </Grid.Column>
      </Grid>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
