import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { DASHBOARD_URL } from "../../helpers/mappings";
import useAuthority from "../../helpers/authorities";
import { UserAuthority } from "../../types";

function DashboardMenu() {
  return (
    <Menu fluid vertical>
      <Menu.Item>
        <Link to={DASHBOARD_URL}>Dashboard</Link>
      </Menu.Item>
      {useAuthority(UserAuthority.MANAGE_BOARDS) && (
        <Menu.Item>
          <Link to={`${DASHBOARD_URL}/manage-boards`}>Manage boards</Link>
        </Menu.Item>
      )}
      {useAuthority(UserAuthority.MANAGE_USERS) && (
        <Menu.Item>
          <Link to={`${DASHBOARD_URL}/manage-users`}>Manage users</Link>
        </Menu.Item>
      )}
      {useAuthority(UserAuthority.MANAGE_BANS) && (
        <Menu.Item>
          <Link to={`${DASHBOARD_URL}/manage-bans`}>Manage bans</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default DashboardMenu;
