import React, { createContext, useContext, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Pagination } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";
import Thread from "../thread/Thread";
import ThreadForm from "../thread/ThreadForm";
import BoardHeader from "./BoardHeader";
import NotFound from "../utils/NotFound";
import { AppContext } from "../App";

export const BoardContext = createContext<BoardType>({} as BoardType);

function Board(props: RouteComponentProps<{ label: string; page: string }>) {
  const { label, page } = props.match.params;

  const { setActiveMenuItem } = useContext(AppContext);

  const [board, setBoard] = useState<BoardType>();
  const [pageNumber, setPageNumber] = useState<number>(page ? Number(page) : 1);
  const [notFound, setNotFound] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    setActiveMenuItem(label);

    if (Number.isNaN(pageNumber)) {
      setNotFound(true);
      return;
    }

    getApiRequest<BoardType>(
      `${BOARDS_URL}/${label}?page=${pageNumber > 0 ? pageNumber : 1}`
    )
      .then((result) => {
        if (result.pageCount > 1 && result.pageCount < pageNumber) {
          setNotFound(true);
        }
        setBoard(result);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      });
  }, [label, pageNumber, setActiveMenuItem, setBoard]);

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
        {board.pageCount > 1 && (
          <div style={{ display: "block", marginTop: "20px" }}>
            <Pagination
              boundaryRange={1}
              siblingRange={3}
              totalPages={board.pageCount}
              activePage={pageNumber}
              onPageChange={(_, { activePage }) => {
                history.push(`${BOARD_URL(board)}/${activePage}`);
                setPageNumber(activePage as number);
              }}
            />
          </div>
        )}
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default Board;
