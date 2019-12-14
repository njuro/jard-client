import React, { useContext, useEffect, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { getApiRequest, postApiRequest } from "../../helpers/api";
import { BOARDS_URL, LOGOUT_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";

function MainMenu() {
  const { user, setUser } = useContext(AuthContext);
  const [boards, setBoards] = useState<BoardType[]>([]);

  function handleLogout() {
    postApiRequest(LOGOUT_URL).then(() => setUser(undefined));
  }

  useEffect(() => {
    async function fetchBoards() {
      const result = await getApiRequest<BoardType[]>(BOARDS_URL);
      setBoards(result);
    }

    fetchBoards();
  }, []);

  return (
    <Menu>
      <Menu.Item header>
        <Link to="/">JBoard</Link>
      </Menu.Item>
      {boards.map(board => (
        <Menu.Item key={board.label} name={board.label}>
          <Link to={`/boards/${board.label}`}>
            /{board.label}/ - {board.name}
          </Link>
        </Menu.Item>
      ))}
      {!user && (
        <Menu.Item position="right">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Menu.Item>
      )}
      {user && (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="#">
              <Button onClick={handleLogout}>Logout</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default MainMenu;
