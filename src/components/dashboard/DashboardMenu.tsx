import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { DASHBOARD_URL } from "../../helpers/mappings";

function DashboardMenu() {
  return (
    <Menu fluid={true} vertical={true}>
      <Menu.Item>
        <Link to={DASHBOARD_URL}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${DASHBOARD_URL}/manage-boards`}>Manage boards</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${DASHBOARD_URL}/manage-users`}>Manage users</Link>
      </Menu.Item>
    </Menu>
  );
}

export default DashboardMenu;
