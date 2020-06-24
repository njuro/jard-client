import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL } from "../../helpers/mappings";
import { ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import BoardHeader from "../board/BoardHeader";
import Thread from "./Thread";

function ThreadWrapper(
  props: RouteComponentProps<{ label: string; threadNumber: string }>
) {
  const { label } = props.match.params;
  const threadNumber = Number(props.match.params.threadNumber);

  const [thread, setThread] = useState<ThreadType>();

  useEffect(() => {
    getApiRequest<ThreadType>(`${BOARDS_URL}/${label}/${threadNumber}`).then(
      setThread
    );
  }, [label, threadNumber]);

  return (
    (thread && (
      <BoardContext.Provider value={thread.board!}>
        <BoardHeader />
        <Thread thread={thread} />
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default ThreadWrapper;
