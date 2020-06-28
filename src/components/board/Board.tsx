import React, { createContext, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Pagination } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";
import Thread from "../thread/Thread";
import ThreadForm from "../thread/ThreadForm";
import BoardHeader from "./BoardHeader";
import NotFound from "../utils/NotFound";

export const BoardContext = createContext<BoardType>({} as BoardType);

function Board(props: RouteComponentProps<{ label: string; page: string }>) {
  const { label, page } = props.match.params;
  const [board, setBoard] = useState<BoardType>();
  const [pageNumber, setPageNumber] = useState<number>(page ? Number(page) : 1);
  const [notFound, setNotFound] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    if (Number.isNaN(pageNumber)) {
      setNotFound(true);
      return;
    }

    getApiRequest<BoardType>(`${BOARDS_URL}/${label}?page=${pageNumber}`)
      .then((result) => {
        if (result.pageCount > 1 && result.pageCount < pageNumber) {
          setNotFound(true);
        }
        setBoard(result);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      });
  }, [label, pageNumber, setBoard]);

  if (notFound) {
    return <NotFound />;
  }

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
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={board.pageCount}
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
