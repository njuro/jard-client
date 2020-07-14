import React, { useContext, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { useHistory } from "react-router";
import { AppContext } from "../App";
import { NOT_FOUND_URL } from "../../helpers/mappings";

function NotFound() {
  const { setActiveMenuItem } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    history.push(NOT_FOUND_URL);
    setActiveMenuItem(undefined);
  }, [history, setActiveMenuItem]);

  return (
    <header>
      <Header as="h1" textAlign="center">
        404 - Not Found
      </Header>
    </header>
  );
}

export default NotFound;
