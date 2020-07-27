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
import LoadingIndicator from "../utils/LoadingIndicator";
import Footer from "../base/Footer";

export const BoardContext = createContext<BoardType>({} as BoardType);

function Board() {
  const { label, page } = useParams();

  const { setActiveMenuPath } = useContext(AppContext);

  const [board, setBoard] = useState<BoardType>();
  const [pageNumber, setPageNumber] = useState<number>(page ? Number(page) : 1);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
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
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [label, pageNumber, setActiveMenuPath, setBoard]);

  if (notFound) {
    return <Redirect to={NOT_FOUND_URL} />;
  }

  if (loading) {
    return <LoadingIndicator />;
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
        <Footer />
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default Board;
