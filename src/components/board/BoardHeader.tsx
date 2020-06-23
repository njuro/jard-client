import React, { useContext } from "react";
import { Button, Header } from "semantic-ui-react";
import { BoardContext } from "./Board";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BOARD_CATALOG_URL, BOARD_URL } from "../../helpers/mappings";

interface BoardHeaderProps {
  catalog?: boolean;
}

function BoardHeader({ catalog }: BoardHeaderProps) {
  const board = useContext(BoardContext);

  return (
    <header>
      <Header as="h1" textAlign="center">
        {catalog && "Catalog of "} /{board.label}/ - {board.name}
      </Header>
      <div style={{ textAlign: "center" }}>
        <Link to={catalog ? BOARD_URL(board) : BOARD_CATALOG_URL(board)}>
          <strong>[{catalog ? "List" : "Catalog"}]</strong>
        </Link>
      </div>
    </header>
  );
}

export default BoardHeader;
