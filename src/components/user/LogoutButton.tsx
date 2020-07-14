import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { postApiRequest } from "../../helpers/api";
import { LOGOUT_URL } from "../../helpers/mappings";
import { AppContext } from "../App";

function LogoutButton() {
  const { setUser } = useContext(AppContext);

  function handleLogout() {
    postApiRequest(LOGOUT_URL).then(() => setUser(undefined));
  }

  return (
    <Link to="#">
      <Button onClick={handleLogout}>Logout</Button>
    </Link>
  );
}

export default LogoutButton;
