import React, { createContext, useContext, useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import DashboardMenu from "./DashboardMenu";
import DashboardSwitch from "./DashboardSwitch";
import { AppContext } from "../App";
import { SetStateType } from "../../types";
import { DASHBOARD_URL } from "../../helpers/mappings";

interface DashboardContextProps {
  activeDashboardPath?: string;
  setActiveDashboardPath: SetStateType<string | undefined>;
}
export const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
);
function Dashboard() {
  const { setActiveMenuPath } = useContext(AppContext);

  const [activeDashboardPath, setActiveDashboardPath] = useState<string>();

  useEffect(() => {
    setActiveMenuPath(DASHBOARD_URL);
    setActiveDashboardPath(DASHBOARD_URL);
  }, [setActiveMenuPath, setActiveDashboardPath]);

  return (
    <DashboardContext.Provider
      value={{
        activeDashboardPath,
        setActiveDashboardPath,
      }}
    >
      <Helmet title="Dashboard" />
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
