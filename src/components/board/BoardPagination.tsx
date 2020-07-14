import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { Pagination, PaginationProps } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { BoardType, SetStateType } from "../../types";
import { BOARD_URL } from "../../helpers/mappings";

const PaginationContainer = styled.div`
  display: block !important;
  margin-top: 20px !important;
`;

interface BoardPaginationProps {
  board: BoardType;
  pageNumber: number;
  setPageNumber: SetStateType<number>;
}
function BoardPagination({
  board,
  pageNumber,
  setPageNumber,
}: BoardPaginationProps) {
  const history = useHistory();

  return (
    <PaginationContainer>
      <Pagination
        boundaryRange={1}
        siblingRange={3}
        totalPages={board.pageCount}
        activePage={pageNumber}
        onPageChange={(_: SyntheticEvent, { activePage }: PaginationProps) => {
          history.push(`${BOARD_URL(board)}/${activePage}`);
          setPageNumber(Number(activePage));
        }}
      />
    </PaginationContainer>
  );
}

export default BoardPagination;
