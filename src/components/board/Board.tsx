import React, { createContext, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Pagination } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";
import Thread from "../thread/Thread";
import ThreadForm from "../thread/ThreadForm";
import BoardHeader from "./BoardHeader";

export const BoardContext = createContext<BoardType>({} as BoardType);

function Board(props: RouteComponentProps<{ label: string; page: string }>) {
  const { label, page } = props.match.params;
  const [board, setBoard] = useState<BoardType>();
  const [pageNumber, setPageNumber] = useState<number>(page ? Number(page) : 1);
  const history = useHistory();

  useEffect(() => {
    getApiRequest<BoardType>(`${BOARDS_URL}/${label}?page=${pageNumber}`).then(
      setBoard
    );
  }, [label, pageNumber, setBoard]);

  return (
    (board && (
      <BoardContext.Provider value={board}>
        <BoardHeader />
        <ThreadForm />
        {board.threads!.map((thread) => (
          <Thread key={thread.originalPost.postNumber} thread={thread} />
        ))}
        <div style={{ display: "block" }}>
          <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={board.threadPages}
            activePage={pageNumber}
            onPageChange={(_, { activePage }) => {
              history.push(`${BOARD_URL(board)}/${activePage}`);
              setPageNumber(activePage as number);
            }}
          />
        </div>
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default Board;
