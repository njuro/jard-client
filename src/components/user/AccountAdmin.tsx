import React, { useContext, useEffect } from "react";
import { Divider, Segment } from "semantic-ui-react";
import { DashboardContext } from "../dashboard/Dashboard";
import { DASHBOARD_MANAGE_ACCOUNT_URL } from "../../helpers/mappings";
import EditPasswordForm from "./EditPasswordForm";
import EditAccountForm from "./EditAccountForm";

function AccountAdmin() {
  const { setActiveDashboardPath } = useContext(DashboardContext);

  useEffect(() => {
    setActiveDashboardPath(DASHBOARD_MANAGE_ACCOUNT_URL);
  }, [setActiveDashboardPath]);

  return (
    <Segment style={{ width: "50%" }}>
      <EditAccountForm />
      <Divider section />
      <EditPasswordForm />
    </Segment>
  );
}

export default AccountAdmin;
