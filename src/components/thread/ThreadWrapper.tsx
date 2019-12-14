import React, { useEffect, useState } from "react";
import Thread from "./Thread";
import { getApiRequest } from "../../helpers/api";
import BoardHeader from "../board/BoardHeader";
import { BoardContext } from "../board/Board";
import { BOARDS_URL } from "../../helpers/mappings";
import { RouteComponentProps } from "react-router";
import { ThreadType } from "../../types";

function ThreadWrapper(
  props: RouteComponentProps<{ label: string; threadNumber: string }>
) {
  const label = props.match.params.label;
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
