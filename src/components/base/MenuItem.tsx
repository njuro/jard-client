import React, { useContext } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";
import { DashboardContext } from "../dashboard/Dashboard";

function MenuItem({ activePath, path, children, ...rest }: MenuItemProps) {
  const history = useHistory();

  return (
    <Menu.Item
      name={path}
      active={activePath === path}
      onClick={() => path && history.push(path)}
      {...rest}
    >
      {children}
    </Menu.Item>
  );
}

export function MainMenuItem({ children, ...rest }: MenuItemProps) {
  const { activeMenuPath } = useContext(AppContext);

  return (
    <MenuItem activePath={activeMenuPath} {...rest}>
      {children}
    </MenuItem>
  );
}

export function DashboardMenuItem({ children, ...rest }: MenuItemProps) {
  const { activeDashboardPath } = useContext(DashboardContext);

  return (
    <MenuItem activePath={activeDashboardPath} {...rest}>
      {children}
    </MenuItem>
  );
}
