import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL, NOT_FOUND_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";
import Thread from "../thread/Thread";
import ThreadForm from "../thread/ThreadForm";
import BoardHeader from "./BoardHeader";
import { AppContext } from "../App";
import BoardPagination from "./BoardPagination";

export const BoardContext = createContext<BoardType>({} as BoardType);

function Board() {
  const { label, page } = useParams();

  const { setActiveMenuPath } = useContext(AppContext);

  const [board, setBoard] = useState<BoardType>();
  const [pageNumber, setPageNumber] = useState<number>(page ? Number(page) : 1);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    setActiveMenuPath(label);

    const location = window.location.pathname;
    if (!location.endsWith("/") && window.history.pushState) {
      window.history.pushState({}, "", `${location}/`);
    }

    if (Number.isNaN(pageNumber)) {
      setNotFound(true);
      return;
    }

    getApiRequest<BoardType>(
      `${BOARDS_URL}/${label}?page=${pageNumber > 0 ? pageNumber : 1}`
    )
      .then((result) => {
        if (result.pageCount > 0 && result.pageCount < pageNumber - 1) {
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
  }, [label, pageNumber, setActiveMenuPath, setBoard]);

  if (notFound) {
    return <Redirect to={NOT_FOUND_URL} />;
  }

  return (
    (board && (
      <BoardContext.Provider value={board}>
        <Helmet title={`/${board.label}/ - ${board.name}`} />
        <BoardHeader />
        <ThreadForm />
        {board.threads?.map((thread) => (
          <Thread
            key={`${board.label}-${thread.originalPost.postNumber}`}
            thread={thread}
          />
        ))}
        {board.pageCount > 1 && (
          <BoardPagination
            board={board}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        )}
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default Board;
