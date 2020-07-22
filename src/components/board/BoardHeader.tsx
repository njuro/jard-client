import React, { useContext } from "react";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { BoardContext } from "./Board";
import { BOARD_CATALOG_URL, BOARD_URL } from "../../helpers/mappings";
import { secondaryColor } from "../../helpers/theme";

const BoardName = styled(Header)`
  text-align: center;
  color: ${secondaryColor};
`;
const NSFWIndicator = styled.span`
  color: red;
  font-weight: bold;
  display: block;
`;
interface BoardHeaderProps {
  catalog?: boolean;
}
function BoardHeader({ catalog }: BoardHeaderProps) {
  const board = useContext(BoardContext);

  return (
    <header>
      <BoardName as="h1">
        {catalog && "Catalog of "} /{board.label}/ - {board.name}
      </BoardName>
      <div style={{ textAlign: "center" }}>
        {board.settings.nsfw && <NSFWIndicator>[NSFW]</NSFWIndicator>}
        <Link to={catalog ? BOARD_URL(board) : BOARD_CATALOG_URL(board)}>
          <strong>[{catalog ? "List" : "Catalog"}]</strong>
        </Link>
      </div>
    </header>
  );
}

export default BoardHeader;
