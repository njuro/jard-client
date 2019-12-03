import React, { useContext } from "react";
import { Header } from "semantic-ui-react";
import { BoardContext } from "./Board";

function BoardHeader() {
  const board = useContext(BoardContext);

  return (
    <header>
      <Header as="h1" textAlign="center">
        /{board.label}/ - {board.name}
      </Header>
    </header>
  );
}

export default BoardHeader;
