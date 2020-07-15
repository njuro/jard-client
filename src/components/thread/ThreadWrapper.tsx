import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL, NOT_FOUND_URL } from "../../helpers/mappings";
import { ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import BoardHeader from "../board/BoardHeader";
import Thread from "./Thread";

function ThreadWrapper() {
  const { label, threadNumber } = useParams();

  const [thread, setThread] = useState<ThreadType>();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    getApiRequest<ThreadType>(`${BOARDS_URL}/${label}/thread/${threadNumber}`)
      .then(setThread)
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      });
  }, [label, threadNumber]);

  if (notFound) {
    return <Redirect to={NOT_FOUND_URL} />;
  }

  return (
    (thread && thread.board && (
      <BoardContext.Provider value={thread.board}>
        <BoardHeader />
        <Thread thread={thread} />
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default ThreadWrapper;
