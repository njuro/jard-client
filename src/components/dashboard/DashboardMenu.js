import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../../helpers/mappings";

function DashboardMenu(props) {
  return (
    <Menu fluid vertical>
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
