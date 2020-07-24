import React, { useContext, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AppContext } from "../App";
import { NOT_FOUND_URL } from "../../helpers/mappings";

function NotFound() {
  const { setActiveMenuPath } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    history.push(NOT_FOUND_URL);
    setActiveMenuPath(undefined);
  }, [history, setActiveMenuPath]);

  return (
    <header>
      <Helmet title="404 - Not Found" />
      <Header as="h1" textAlign="center">
        404 - Not Found
      </Header>
    </header>
  );
}

export default NotFound;
