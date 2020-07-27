import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL, NOT_FOUND_URL } from "../../helpers/mappings";
import { ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import BoardHeader from "../board/BoardHeader";
import Thread from "./Thread";
import LoadingIndicator from "../utils/LoadingIndicator";
import Footer from "../base/Footer";

function ThreadWrapper() {
  const { label, threadNumber } = useParams();

  const [thread, setThread] = useState<ThreadType>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getThreadTitle = useCallback(
    () =>
      thread?.subject ??
      thread?.originalPost.body.replace(/<(.|\n)*?>/g, "").substring(0, 50),
    [thread]
  );

  useEffect(() => {
    setLoading(true);
    getApiRequest<ThreadType>(`${BOARDS_URL}/${label}/thread/${threadNumber}`)
      .then(setThread)
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [label, threadNumber]);

  if (notFound) {
    return <Redirect to={NOT_FOUND_URL} />;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    (thread && thread.board && (
      <BoardContext.Provider value={thread.board}>
        <Helmet
          title={`/${thread.board.label}/ - ${getThreadTitle()} - ${
            thread.board.name
          }`}
        />
        <BoardHeader />
        <Thread thread={thread} full />
        <Footer />
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default ThreadWrapper;
