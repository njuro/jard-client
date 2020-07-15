import React from "react";
import { Menu } from "semantic-ui-react";
import {
  DASHBOARD_MANAGE_BANS_URL,
  DASHBOARD_MANAGE_BOARDS_URL,
  DASHBOARD_MANAGE_USERS_URL,
  DASHBOARD_URL,
} from "../../helpers/mappings";
import useAuthority from "../../helpers/useAuthority";
import { UserAuthority } from "../../types";
import { DashboardMenuItem as MenuItem } from "../base/MenuItem";

function DashboardMenu() {
  return (
    <Menu fluid vertical>
      <MenuItem path={DASHBOARD_URL}>Dashboard</MenuItem>
      {useAuthority(UserAuthority.MANAGE_BOARDS) && (
        <MenuItem path={DASHBOARD_MANAGE_BOARDS_URL}>Manage boards</MenuItem>
      )}
      {useAuthority(UserAuthority.MANAGE_USERS) && (
        <MenuItem path={DASHBOARD_MANAGE_USERS_URL}>Manage users</MenuItem>
      )}
      {useAuthority(UserAuthority.MANAGE_BANS) && (
        <MenuItem path={DASHBOARD_MANAGE_BANS_URL}>Manage bans</MenuItem>
      )}
    </Menu>
  );
}

export default DashboardMenu;
