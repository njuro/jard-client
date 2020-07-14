import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import {
  BOARD_URL,
  BOARDS_URL,
  DASHBOARD_URL,
  HOME_URL,
  LOGIN_URL,
} from "../../helpers/mappings";
import { BoardType } from "../../types";
import { AppContext } from "../App";
import LogoutButton from "../user/LogoutButton";

export const MENU_ITEM_HOME = "home";
export const MENU_ITEM_DASHBOARD = "dashboard";
export const MENU_ITEM_LOGIN = "login";

function MainMenu() {
  const { user, activeMenuItem, setActiveMenuItem } = useContext(AppContext);
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    getApiRequest<BoardType[]>(BOARDS_URL).then(setBoards);
  }, []);

  return (
    <Menu>
      <Menu.Item active={activeMenuItem === MENU_ITEM_HOME}>
        <Link to={HOME_URL}>
          <strong>jard</strong>
        </Link>
      </Menu.Item>
      {boards.map((board) => (
        <Menu.Item
          key={board.label}
          name={board.label}
          active={board.label === activeMenuItem}
        >
          <Link
            to={BOARD_URL(board)}
            onClick={() => setActiveMenuItem(board.label)}
          >
            /{board.label}/ - {board.name}
          </Link>
        </Menu.Item>
      ))}
      {!user && (
        <Menu.Item position="right" active={activeMenuItem === MENU_ITEM_LOGIN}>
          <Link to={LOGIN_URL}>
            <Button>Login</Button>
          </Link>
        </Menu.Item>
      )}
      {user && (
        <Menu.Menu position="right">
          <Menu.Item active={activeMenuItem === MENU_ITEM_DASHBOARD}>
            <Link to={DASHBOARD_URL}>
              <Button>Dashboard</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <LogoutButton />
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default MainMenu;
