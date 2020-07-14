import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { DASHBOARD_URL } from "../../helpers/mappings";
import useAuthority from "../../helpers/useAuthority";
import { UserAuthority } from "../../types";
import { DashboardContext } from "./Dashboard";

export const DASHBOARD_ITEM_HOME = "dashboard-home";
export const DASHBOARD_ITEM_BOARDS = "manage-boards";
export const DASHBOARD_ITEM_USERS = "manage-users";
export const DASHBOARD_ITEM_BANS = "manage-bans";

function DashboardMenu() {
  const { activeDashboardItem } = useContext(DashboardContext);

  return (
    <Menu fluid vertical>
      <Menu.Item active={activeDashboardItem === DASHBOARD_ITEM_HOME}>
        <Link to={DASHBOARD_URL}>Dashboard</Link>
      </Menu.Item>
      {useAuthority(UserAuthority.MANAGE_BOARDS) && (
        <Menu.Item active={activeDashboardItem === DASHBOARD_ITEM_BOARDS}>
          <Link to={`${DASHBOARD_URL}/manage-boards`}>Manage boards</Link>
        </Menu.Item>
      )}
      {useAuthority(UserAuthority.MANAGE_USERS) && (
        <Menu.Item active={activeDashboardItem === DASHBOARD_ITEM_USERS}>
          <Link to={`${DASHBOARD_URL}/manage-users`}>Manage users</Link>
        </Menu.Item>
      )}
      {useAuthority(UserAuthority.MANAGE_BANS) && (
        <Menu.Item active={activeDashboardItem === DASHBOARD_ITEM_BANS}>
          <Link to={`${DASHBOARD_URL}/manage-bans`}>Manage bans</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default DashboardMenu;
